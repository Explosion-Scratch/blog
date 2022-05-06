---
title: Creating a roles system and linking it to MongoDB
description: Creating roles such as "moderation", "comments.read", "comments.write", "admin.read", etc
category: Roles, Security, MongoDB
createdAt: Friday, May 6 2022, 6:00 AM
---

# First of all
Hi, sorry I haven't been writing on my blog lately, I've been really busy. Also if you've noticed that my GitHub profile frequently shows that I've been commiting in private repos, that's because I have!

<details>
  <summary>I don't care about your life get on with the blog</summary>
  ok keep scrolling
</details>

<details>
  <summary>Oh cool what are you making?</summary>
  It's a pretty complicated website for school, it has an accounts system, email verification, and uses GraphQL for the API. It also hooks up with MongoDB and runs on SvelteKit!
</details>

# The roles system
I really wanted to create a roles system with privaleges that could either be granular or very broad. For this I wanted to check if the user has a role for each API route, such as to delete your own account I would want the user to need the `me.delete` role. By default every user would have a "me" role which would give them privaledges over their own account, but I wanted to be able to eventually have an admin panel that allows admins to grant and revoke more granular privaleges. 

Here are the roles I wanted:
```js
// Modules and challenges are specific to my project 😃
export const roles = {
	admin: { description: 'Admin access', alias: ['challenges', 'modules', 'users', 'database'] },
	roles: {
		description: 'Full access to remove and create roles',
		create: {
			description: 'Add roles to users'
		},
		remove: {
			description: 'Remove roles from users'
		}
	},
	database: {
		description: 'Access to the MongoDB database'
	},
	challenges: {
		description: 'Read and write access to all challenges',
		read: 'Read access to challenges',
		write: 'Write access to challenges',
		delete: {
			description: 'Delete a challenge'
		},
		update: {
			description: 'Update a challenge',
			slug: "Update a challenge's slug",
			title: "Update a challenge's title",
			frontMatter: "Update a challenge's frontmatter"
		}
	},
	modules: {
		description: 'Read and write access to all modules',
		read: 'Read access to modules',
		write: 'Write access to modules',
		update: {
			description: 'Update a module',
			level: { description: 'Update the level of a module' },
			frontMatter: { description: 'Update the frontMatter of a module' },
			title: { description: 'Update the title of a module' }
		}
	},
	users: {
		description: 'Full access to user management',
		read: 'Read access to all users',
		write: 'Write access to all users',
		moderation: {
			username: {
				description: 'Change the username of a user'
			},
			ban: {
				description: 'Access to banning users'
			},
			delete: {
				description: 'Delete a user'
			},
			mute: {
				description: 'Mute users'
			},
			invalidateSession: {
				description: 'Invalidate user sessions'
			},
			email: {
				description: 'Change the email address of a user'
			},
			isVerified: {
				description: 'Verify or unverify a user'
			},
			passwordHash: {
				description: 'Update the password of a user'
			}
		},
		notifications: {
			description: 'Access to user notifications'
		},
		moduleLevel: {
			description: 'Change the level of a user'
		},
		moduleList: {
			description: 'Update the list of completed modules of a user'
		},
		challengeList: {
			description: 'Update the list of completed challenges for a user'
		},
		profilePicture: {
			description: 'Profile picture access'
		}
	},
	default: {
		description: 'The default roles',
		alias: ['challenges.read', 'modules.read', 'me']
	},
	me: {
		postComments: {
			description: 'Post comments'
		},
		helpPage: {
			description: 'Use the help page'
		},
		profilePicture: {
			description: 'Change profile pictures'
		}
	}
};
```

As you can see from the code, I have nested roles, and roles with aliases, such as "default". Now the hardest part was to check if a user had a certain role, because if `User.roles` is equal to `["default"]`, then it doesn't contain the role "me.postComments", even though by default, users _should_ be able to post comments. To fix this I'd need to expand a user's roles, following aliases and nested definitions. I could also then use the description property of any role to give an informative error message when the user doesn't have permission to do something. Here is my code to expand the roles: 

```js
export function getRoles(userRoles) {
	userRoles = userRoles
		.map((i) => {
      /*
      One liner from SO, flattens an object with a seperator, so this nested object:
      {
          "hello": "world",
          "nested": {
              "obj": "cool",
              "hi": "mom",
              "more": {
                  "nested": "props"
              }
          }
      }
      
      would become this:
      
      {
          "hello": "world",
          "nested.obj": "cool",
          "nested.hi": "mom",
          "nested.more.nested": "props"
      }
      */
    
			const flatten = (obj, roots = [], sep = '.') =>
				Object.keys(obj).reduce(
					(memo, prop) =>
						Object.assign(
							{},
							memo,
							Object.prototype.toString.call(obj[prop]) === '[object Object]'
								? flatten(obj[prop], roots.concat([prop]), sep)
								: { [roots.concat([prop]).join(sep)]: obj[prop] }
						),
					{}
				);

			// e.g. users.moderation, contains nester properties
			if (typeof deepGet(i, roles) === 'object') {
				// It's flattened
				if (!deepGet(i, roles)) {
					return [];
				}
				return Object.keys(flatten(deepGet(i, roles)))
          // Delete description
					.filter((j) => j !== 'description')
					.map((j) => `${i}.${j.replace('.description', '')}`);
			} else {
				return i;
			}
		})
    // Flatten again
		.flat(Infinity)
    // Remove falsly values
		.filter(Boolean)
    //Follow aliases
		.map((j) => (j.endsWith('.alias') ? getRoles(deepGet(j, roles)) : j))
		.flat(Infinity);
  //Make array unique
	return [...new Set(userRoles)];
  
  // Deep get a property from an object, so in the first example object you could do deepGet("nested.more.nested", exampleObj) -> "props"
	function deepGet(_path, obj) {
		if (typeof _path === 'string') {
			_path = _path.split('.');
		}
		if (_path.length === 1) {
			return obj[_path] || null;
		} else {
			if (!obj[_path[0]]) {
				return null;
			}
			return deepGet(_path.slice(1), obj[_path[0]]);
		}
	}
}
```

Now it was only a simple `.contains` statement to figure out if a user has a role:
```js
export function hasRole(roles, toCheck){
  return getRoles(roles).contains(toCheck);
}
```

This actually took like 4 hours to write the code for, so hopefully it's useful to someone somewhere.

Until next time,

--Explosion--
