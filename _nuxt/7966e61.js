(window.webpackJsonp = window.webpackJsonp || []).push([
  [9],
  {
    329: function (r, o, t) {
      var content = t(347);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[r.i, content, ""]]),
        content.locals && (r.exports = content.locals);
      (0, t(30).default)("107b7f8f", content, !0, { sourceMap: !1 });
    },
    342: function (r, o, t) {
      "use strict";
      var e = t(3),
        d = t(343);
      e(
        { target: "String", proto: !0, forced: t(344)("link") },
        {
          link: function (r) {
            return d(this, "a", "href", r);
          },
        }
      );
    },
    343: function (r, o, t) {
      var e = t(24),
        d = t(9),
        n = /"/g;
      r.exports = function (r, o, t, x) {
        var l = d(e(r)),
          c = "<" + o;
        return (
          "" !== t && (c += " " + t + '="' + d(x).replace(n, "&quot;") + '"'),
          c + ">" + l + "</" + o + ">"
        );
      };
    },
    344: function (r, o, t) {
      var e = t(4);
      r.exports = function (r) {
        return e(function () {
          var o = ""[r]('"');
          return o !== o.toLowerCase() || o.split('"').length > 3;
        });
      };
    },
    345: function (r, o, t) {
      var e = t(3),
        d = t(207),
        n = t(64);
      e(
        { target: "Object", stat: !0 },
        {
          fromEntries: function (r) {
            var o = {};
            return (
              d(
                r,
                function (r, t) {
                  n(o, r, t);
                },
                { AS_ENTRIES: !0 }
              ),
              o
            );
          },
        }
      );
    },
    346: function (r, o, t) {
      "use strict";
      t(329);
    },
    347: function (r, o, t) {
      var e = t(29)(function (i) {
        return i[1];
      });
      e.push([
        r.i,
        "[data-v-560c6092]:export{dark:true}@-webkit-keyframes pulse-data-v-560c6092{0%,to{opacity:1}50%{opacity:.5}}@keyframes pulse-data-v-560c6092{0%,to{opacity:1}50%{opacity:.5}}@-webkit-keyframes shadowPulse-data-v-560c6092{0%{filter:drop-shadow(4px 14px rgba(66,184,131,.2142857143)) drop-shadow(8px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 35px rgba(66,184,131,.0857142857)) drop-shadow(8px 44px rgba(66,184,131,.0681818182)) drop-shadow(4px 22px rgba(66,184,131,.1363636364))}10%{filter:drop-shadow(3px 9px rgba(66,184,131,.3333333333)) drop-shadow(4px 31px rgba(66,184,131,.0967741935)) drop-shadow(-8px 3px #42b883) drop-shadow(3px 19px rgba(66,184,131,.1578947368)) drop-shadow(5px 26px rgba(66,184,131,.1153846154))}20%{filter:drop-shadow(-3px 22px rgba(66,184,131,.1363636364)) drop-shadow(-4px 26px rgba(66,184,131,.1153846154)) drop-shadow(3px 1px #42b883) drop-shadow(2px 15px rgba(66,184,131,.2)) drop-shadow(9px 11px rgba(66,184,131,.2727272727))}30%{filter:drop-shadow(-9px 44px rgba(66,184,131,.0681818182)) drop-shadow(6px 37px rgba(66,184,131,.0810810811)) drop-shadow(3px 31px rgba(66,184,131,.0967741935)) drop-shadow(7px 4px rgba(66,184,131,.75)) drop-shadow(0 23px rgba(66,184,131,.1304347826))}40%{filter:drop-shadow(5px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 25px rgba(66,184,131,.12)) drop-shadow(-7px 22px rgba(66,184,131,.1363636364)) drop-shadow(5px 29px rgba(66,184,131,.1034482759)) drop-shadow(6px 13px rgba(66,184,131,.2307692308))}50%{filter:drop-shadow(0 20px rgba(66,184,131,.15)) drop-shadow(5px 33px rgba(66,184,131,.0909090909)) drop-shadow(8px 47px rgba(66,184,131,.0638297872)) drop-shadow(4px 27px rgba(66,184,131,.1111111111)) drop-shadow(-3px 29px rgba(66,184,131,.1034482759))}60%{filter:drop-shadow(9px 33px rgba(66,184,131,.0909090909)) drop-shadow(8px 38px rgba(66,184,131,.0789473684)) drop-shadow(3px 1px #42b883) drop-shadow(-7px 23px rgba(66,184,131,.1304347826)) drop-shadow(-3px 21px rgba(66,184,131,.1428571429))}70%{filter:drop-shadow(-6px 5px rgba(66,184,131,.6)) drop-shadow(3px 44px rgba(66,184,131,.0681818182)) drop-shadow(-5px 22px rgba(66,184,131,.1363636364)) drop-shadow(1px 24px rgba(66,184,131,.125)) drop-shadow(-1px 23px rgba(66,184,131,.1304347826))}80%{filter:drop-shadow(0 48px rgba(66,184,131,.0625)) drop-shadow(8px 43px rgba(66,184,131,.0697674419)) drop-shadow(-3px 48px rgba(66,184,131,.0625)) drop-shadow(2px 33px rgba(66,184,131,.0909090909)) drop-shadow(-3px 1px #42b883)}90%{filter:drop-shadow(5px 40px rgba(66,184,131,.075)) drop-shadow(6px 1px #42b883) drop-shadow(3px 36px rgba(66,184,131,.0833333333)) drop-shadow(-1px 35px rgba(66,184,131,.0857142857)) drop-shadow(9px 11px rgba(66,184,131,.2727272727))}to{filter:drop-shadow(-6px 47px rgba(66,184,131,.0638297872)) drop-shadow(-4px 7px rgba(66,184,131,.4285714286)) drop-shadow(-6px 48px rgba(66,184,131,.0625)) drop-shadow(-9px 7px rgba(66,184,131,.4285714286)) drop-shadow(-2px 13px rgba(66,184,131,.2307692308))}to{filter:drop-shadow(4px 14px rgba(66,184,131,.2142857143)) drop-shadow(8px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 35px rgba(66,184,131,.0857142857)) drop-shadow(8px 44px rgba(66,184,131,.0681818182)) drop-shadow(4px 22px rgba(66,184,131,.1363636364))}}@keyframes shadowPulse-data-v-560c6092{0%{filter:drop-shadow(4px 14px rgba(66,184,131,.2142857143)) drop-shadow(8px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 35px rgba(66,184,131,.0857142857)) drop-shadow(8px 44px rgba(66,184,131,.0681818182)) drop-shadow(4px 22px rgba(66,184,131,.1363636364))}10%{filter:drop-shadow(3px 9px rgba(66,184,131,.3333333333)) drop-shadow(4px 31px rgba(66,184,131,.0967741935)) drop-shadow(-8px 3px #42b883) drop-shadow(3px 19px rgba(66,184,131,.1578947368)) drop-shadow(5px 26px rgba(66,184,131,.1153846154))}20%{filter:drop-shadow(-3px 22px rgba(66,184,131,.1363636364)) drop-shadow(-4px 26px rgba(66,184,131,.1153846154)) drop-shadow(3px 1px #42b883) drop-shadow(2px 15px rgba(66,184,131,.2)) drop-shadow(9px 11px rgba(66,184,131,.2727272727))}30%{filter:drop-shadow(-9px 44px rgba(66,184,131,.0681818182)) drop-shadow(6px 37px rgba(66,184,131,.0810810811)) drop-shadow(3px 31px rgba(66,184,131,.0967741935)) drop-shadow(7px 4px rgba(66,184,131,.75)) drop-shadow(0 23px rgba(66,184,131,.1304347826))}40%{filter:drop-shadow(5px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 25px rgba(66,184,131,.12)) drop-shadow(-7px 22px rgba(66,184,131,.1363636364)) drop-shadow(5px 29px rgba(66,184,131,.1034482759)) drop-shadow(6px 13px rgba(66,184,131,.2307692308))}50%{filter:drop-shadow(0 20px rgba(66,184,131,.15)) drop-shadow(5px 33px rgba(66,184,131,.0909090909)) drop-shadow(8px 47px rgba(66,184,131,.0638297872)) drop-shadow(4px 27px rgba(66,184,131,.1111111111)) drop-shadow(-3px 29px rgba(66,184,131,.1034482759))}60%{filter:drop-shadow(9px 33px rgba(66,184,131,.0909090909)) drop-shadow(8px 38px rgba(66,184,131,.0789473684)) drop-shadow(3px 1px #42b883) drop-shadow(-7px 23px rgba(66,184,131,.1304347826)) drop-shadow(-3px 21px rgba(66,184,131,.1428571429))}70%{filter:drop-shadow(-6px 5px rgba(66,184,131,.6)) drop-shadow(3px 44px rgba(66,184,131,.0681818182)) drop-shadow(-5px 22px rgba(66,184,131,.1363636364)) drop-shadow(1px 24px rgba(66,184,131,.125)) drop-shadow(-1px 23px rgba(66,184,131,.1304347826))}80%{filter:drop-shadow(0 48px rgba(66,184,131,.0625)) drop-shadow(8px 43px rgba(66,184,131,.0697674419)) drop-shadow(-3px 48px rgba(66,184,131,.0625)) drop-shadow(2px 33px rgba(66,184,131,.0909090909)) drop-shadow(-3px 1px #42b883)}90%{filter:drop-shadow(5px 40px rgba(66,184,131,.075)) drop-shadow(6px 1px #42b883) drop-shadow(3px 36px rgba(66,184,131,.0833333333)) drop-shadow(-1px 35px rgba(66,184,131,.0857142857)) drop-shadow(9px 11px rgba(66,184,131,.2727272727))}to{filter:drop-shadow(-6px 47px rgba(66,184,131,.0638297872)) drop-shadow(-4px 7px rgba(66,184,131,.4285714286)) drop-shadow(-6px 48px rgba(66,184,131,.0625)) drop-shadow(-9px 7px rgba(66,184,131,.4285714286)) drop-shadow(-2px 13px rgba(66,184,131,.2307692308))}to{filter:drop-shadow(4px 14px rgba(66,184,131,.2142857143)) drop-shadow(8px 7px rgba(66,184,131,.4285714286)) drop-shadow(4px 35px rgba(66,184,131,.0857142857)) drop-shadow(8px 44px rgba(66,184,131,.0681818182)) drop-shadow(4px 22px rgba(66,184,131,.1363636364))}}*[data-v-560c6092]{box-sizing:border-box}.link_preview[data-v-560c6092]{font-size:13px!important;margin:15px auto;display:flex;width:100%;border-radius:5px;overflow:hidden;box-shadow:3px 2px 10px -5px rgba(0,0,0,.26666666666666666)}.img[data-v-560c6092]{display:block;flex:1}.img img[data-v-560c6092]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.right[data-v-560c6092]{flex:2;padding:10px 10px 20px}.right[data-v-560c6092],.right .description[data-v-560c6092]{color:#ccc}.right .visit[data-v-560c6092]{transition:all .3s ease;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:block;text-decoration:none;padding:6px 15px;border-radius:5px;background:transparent;border:2px solid #42b883;color:#8bd5b4}.right .visit[data-v-560c6092]:hover{background:rgba(66,184,131,.1);box-shadow:0 0 0 2px rgba(66,184,131,.1)}@media(max-width:400px){.link_preview[data-v-560c6092]{flex-direction:column;box-shadow:1px 2px 10px -5px rgba(0,0,0,.6)}.link_preview .right .visit[data-v-560c6092]{width:100%;padding:10px;border-radius:6px;text-align:center;background:#276d4e;color:#8bd5b4}}",
        "",
      ]),
        (e.locals = {}),
        (r.exports = e);
    },
    364: function (r, o, t) {
      "use strict";
      t.r(o);
      t(36), t(46), t(27), t(47);
      var e = t(16),
        d = t(91),
        n = t(6);
      t(33),
        t(342),
        t(26),
        t(43),
        t(7),
        t(15),
        t(23),
        t(206),
        t(42),
        t(51),
        t(136),
        t(99),
        t(101),
        t(62),
        t(45),
        t(35),
        t(209),
        t(345),
        t(53),
        t(22);
      function x(object, r) {
        var o = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var t = Object.getOwnPropertySymbols(object);
          r &&
            (t = t.filter(function (r) {
              return Object.getOwnPropertyDescriptor(object, r).enumerable;
            })),
            o.push.apply(o, t);
        }
        return o;
      }
      function l(r) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2
            ? x(Object(source), !0).forEach(function (o) {
                Object(e.a)(r, o, source[o]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(
                r,
                Object.getOwnPropertyDescriptors(source)
              )
            : x(Object(source)).forEach(function (o) {
                Object.defineProperty(
                  r,
                  o,
                  Object.getOwnPropertyDescriptor(source, o)
                );
              });
        }
        return r;
      }
      var c = {
          props: { url: { type: String, default: "https://example.com" } },
          data: function () {
            return {
              link: null,
              title: null,
              description: null,
              img: null,
              _meta: {},
              parsed_meta: {},
            };
          },
          mounted: function () {
            var r = this;
            return Object(n.a)(
              regeneratorRuntime.mark(function o() {
                var t;
                return regeneratorRuntime.wrap(function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        return (
                          console.log("Loading, ", r.url),
                          (o.next = 3),
                          r.meta(r.url)
                        );
                      case 3:
                        (r._meta = o.sent),
                          (t = r.parsed_meta = r.parseMeta(r._meta)),
                          console.log(
                            "Loaded and parsed link preview: ",
                            r.url
                          ),
                          (r.link = r.url),
                          (r.title = t.title),
                          (r.description = t.description),
                          (r.img = t.image),
                          console.log("Updated page", {
                            link: r.link,
                            title: r.title,
                            description: r.description,
                            img: r.img,
                          });
                      case 11:
                      case "end":
                        return o.stop();
                    }
                }, o);
              })
            )();
          },
          methods: {
            host: function (link) {
              return new URL(link).hostname;
            },
            slice: function (text, r) {
              return text.split(" ").slice(0, r).length === r
                ? text.split(" ").slice(0, r).join(" ") + "..."
                : text;
            },
            handleError: function (r) {
              if (!r.src.startsWith("https://cors.explosionscratc.repl.co"))
                return (
                  console.log(r),
                  (r.src = "https://cors.explosionscratc.repl.co/".concat(
                    r.src.split("//")[1]
                  ))
                );
              console.log("Already cors"), (this.img = null), r.remove();
            },
            parseMeta: function (r) {
              var o, t, e, d, n, x, l, c;
              return {
                image:
                  (null == r || null === (o = r.og) || void 0 === o
                    ? void 0
                    : o.image) ||
                  r["twitter:image:src"] ||
                  r.image,
                title:
                  r.title ||
                  (null == r || null === (t = r.twitter) || void 0 === t
                    ? void 0
                    : t.title) ||
                  (null == r || null === (e = r.og) || void 0 === e
                    ? void 0
                    : e.title) ||
                  (null == r || null === (d = r.og) || void 0 === d
                    ? void 0
                    : d.site_name),
                description:
                  r.description ||
                  (null == r || null === (n = r.og) || void 0 === n
                    ? void 0
                    : n.description) ||
                  (null == r || null === (x = r.twitter) || void 0 === x
                    ? void 0
                    : x.description),
                image_alt:
                  null == r || null === (l = r.og) || void 0 === l
                    ? void 0
                    : l["image:alt"],
                color: r["theme-color"],
                icon:
                  null ===
                    (c =
                      r.icon ||
                      r.favicon ||
                      r["alternate icon"] ||
                      r["shortcut icon"] ||
                      r["alternate-icon"] ||
                      r["shortcut icon"] ||
                      r["fluid-icon"]) || void 0 === c
                    ? void 0
                    : c.replace(window.location),
              };
            },
            meta: function (r) {
              return Object(n.a)(
                regeneratorRuntime.mark(function o() {
                  var t, html, base, e;
                  return regeneratorRuntime.wrap(function (o) {
                    for (;;)
                      switch ((o.prev = o.next)) {
                        case 0:
                          return (
                            (t = new DOMParser()),
                            (o.t0 = t),
                            (o.next = 4),
                            fetch(
                              "https://cors.explosionscratc.repl.co/".concat(
                                r.split("//")[1]
                              )
                            ).then(function (r) {
                              return r.text();
                            })
                          );
                        case 4:
                          return (
                            (o.t1 = o.sent),
                            (html = window.html = o.t0.parseFromString.call(
                              o.t0,
                              o.t1,
                              "text/html"
                            )),
                            ((base = document.createElement(
                              "base"
                            )).href = new URL(r).origin),
                            html.head.appendChild(base),
                            (e = {}),
                            html.querySelector("title") &&
                              (e.title = html.querySelector("title").innerText),
                            Object(d.a)(
                              html.querySelectorAll(
                                "meta[property], meta[name]"
                              )
                            )
                              .filter(function (i) {
                                return /^[^:]+:[^:]+/.test(
                                  i.getAttribute("property") ||
                                    i.getAttribute("name")
                                );
                              })
                              .map(function (i) {
                                var r = (
                                  i.getAttribute("property") ||
                                  i.getAttribute("name")
                                ).match(/^([^:]+):(.+)/);
                                (e[r[1]] = e[r[1]] || {}),
                                  (e[r[1]][r[2]] = i.getAttribute("content"));
                              }),
                            o.abrupt(
                              "return",
                              l(
                                l(
                                  {},
                                  Object.fromEntries(
                                    [].concat(
                                      Object(d.a)(
                                        Object(d.a)(
                                          html.querySelectorAll("link")
                                        ).map(function (i) {
                                          return [i.rel, i.href];
                                        })
                                      ),
                                      Object(d.a)(
                                        Object(d.a)(
                                          html.querySelectorAll(
                                            "meta[name], meta[value]"
                                          )
                                        ).map(function (i) {
                                          return [
                                            i.name,
                                            i.getAttribute("content") ||
                                              i.getAttribute("value"),
                                          ];
                                        })
                                      )
                                    )
                                  )
                                ),
                                e
                              )
                            )
                          );
                        case 13:
                        case "end":
                          return o.stop();
                      }
                  }, o);
                })
              )();
            },
          },
        },
        h = (t(346), t(10)),
        component = Object(h.a)(
          c,
          function () {
            var r = this,
              o = r.$createElement,
              t = r._self._c || o;
            return t(
              "div",
              { staticClass: "link_preview" },
              [
                r.title && r.link
                  ? [
                      r.img
                        ? t("div", { staticClass: "img" }, [
                            t("img", {
                              staticClass: "!m-0",
                              attrs: { src: r.img },
                              on: {
                                error: function (o) {
                                  return r.handleError(o.target);
                                },
                              },
                            }),
                          ])
                        : r._e(),
                      r._v(" "),
                      t("div", { staticClass: "right" }, [
                        t("h3", [
                          t("img", {
                            staticClass: "inline !m-0",
                            attrs: {
                              src:
                                "https://www.google.com/s2/favicons?domain=" +
                                r.host(r.link),
                            },
                          }),
                          r._v(
                            "\n        " +
                              r._s(r.slice(r.title, 6)) +
                              "\n      "
                          ),
                        ]),
                        r._v(" "),
                        t("div", { staticClass: "description" }, [
                          r._v(
                            "\n        " +
                              r._s(
                                r.description
                                  ? r.slice(r.description, 15)
                                  : r.link
                              ) +
                              "\n      "
                          ),
                        ]),
                        r._v(" "),
                        t("br"),
                        r._v(" "),
                        t(
                          "a",
                          { staticClass: "visit", attrs: { href: r.link } },
                          [r._v(" Visit ")]
                        ),
                      ]),
                    ]
                  : t(
                      "a",
                      {
                        staticClass:
                          "text-lg loading cursor-pointer flex items-center w-full p-3 hover:text-green-200 bg-opacity-95 transition-colors",
                        attrs: { href: r.url },
                      },
                      [
                        t(
                          "svg",
                          {
                            staticClass: "mr-1 inline",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              "xmlns:xlink": "http://www.w3.org/1999/xlink",
                              "aria-hidden": "true",
                              role: "img",
                              width: "32",
                              height: "32",
                              preserveAspectRatio: "xMidYMid meet",
                              viewBox: "0 0 256 256",
                            },
                          },
                          [
                            t("path", {
                              attrs: {
                                d:
                                  "M208.61 118.1l-28.283 28.285a50.057 50.057 0 0 1-70.711 0a6 6 0 0 1 8.484-8.485a38.046 38.046 0 0 0 53.741 0l28.284-28.285a38 38 0 0 0-53.74-53.74l-19.8 19.799a6 6 0 0 1-8.484-8.485L137.9 47.391a50 50 0 1 1 70.71 70.709zm-79.195 62.226l-19.8 19.799a38 38 0 1 1-53.74-53.74L84.16 118.1a38.046 38.046 0 0 1 53.74-.001a6 6 0 0 0 8.485-8.485a50.055 50.055 0 0 0-70.71 0L47.39 137.9a50 50 0 0 0 70.71 70.71l19.799-19.8a6 6 0 1 0-8.484-8.484z",
                                fill: "currentColor",
                              },
                            }),
                          ]
                        ),
                        r._v("\n    " + r._s(r.url) + "\n  "),
                      ]
                    ),
              ],
              2
            );
          },
          [],
          !1,
          null,
          "560c6092",
          null
        );
      o.default = component.exports;
    },
  },
]);
