---
title: Why GPT4 can't replace us - Gödel's Incompleteness Theorem
description: Gödel's Incompleteness Theorems, their profound impact on mathematics, philosophy and the nature of truth
category: Computation, Math, AI, CS
createdAt: Tuesday, April 4 2023, 2:42 PM
---

Imagine embarking on a quest to find the ultimate treasure: a complete and consistent set of rules that govern the entire realm of mathematics. This was the dream of David Hilbert, a visionary mathematician who believed that such a foundation could be uncovered. However, lurking in the shadows was a profound discovery by Kurt Gödel that would forever change our understanding of mathematics and its limits. Gödel's Incompleteness Theorems exposed the boundaries of human knowledge and revealed that some truths forever remain beyond our grasp.

## Setting the stage
In 1900 in his 1900 address to the International Congress of Mathematicians, David Hilbert proposed the Hilbert Program, a program which would aim to find a complete and consistent set of axioms that would govern all of mathematics, and he set out to prove that these axioms were free of contradictions. HIs program ultimately helped set the stage for modern mathematics as we know it, fueling the development of fields such as set theory and greatly influencing the development of modern mathematic logic. Among this proposal was his famous list of 23 problems. Difficult problems. Problems such as the famous [[Riemann Hypothesis]], [[Continuum Hypothesis]] and more. In essence, the goal was to find a set of rules that would allow us to deduce every mathematical truth and ensure that no contradictions arise.

## A self referential paradox - Gödel's First Incompleteness Theorem
Gödel's ground breaking first theorem shattered the dream of a complete mathematical model. It states that any consistent axiomatic system capable of expressing basic arithmetic is incomplete, meaning that **there will always be true statements that cannot be proven**. In his theory Gödel used the ingenious technique called Gödel numbering, which works as follows:
1. Assign a prime number to each symbol of the system
	- For example a system with the symbols $A$, $B$ and $C$ we would assign the prime numbers 2, 3, and 5
2. To encode an expression you write down the prime numbers for each symbol in the expression, for example let's say we wanted to encode the expression ${A} \cup ({B} \cap {C})$ ("A or (B and C)")
	- $A$ appears once, so we write down 2, $B$ and $C$ also appear once so we write down 3 and 5.
3. You raise each prime number to the power of the number of times the symbol appears in the expression, then multiply, so we get:
	- $2*3*5 = 30$, where $30$ is the Gödel's number for this expression. Because any number can be broken down into prime factors, this means that each expression has a unique Gödel's number in a formal system where each symbol has been assigned a prime.

This system allowed Gödel to create a self-referential statement, similar to the famous liar's paradox: "This statement is unprovable". This statement, if true, cannot be proven within the system, and if false leads to a contradiction. Thus, Gödel demonstrated that there will always be unprovable truths lurking in the shadows of any mathematical system.

## The second incompleteness theorem → The Consistency Conundrum
Gödel's second theorem deals another blow to the quest for a complete and consistent foundation. It states that no consistent, axiomatic system capable of expressing basic arithmetic can prove its own consistency. In other words, we can never be sure that our mathematical system is free of contradictions using only the system's own rules. Therefore, we rely on other external methods to verify the consistency of a system, such as meta-mathematical arguments or empirical evidence. The importance of this is immense, as it means that **human insight will always be necessary**. This revelation casts a shadow of doubt over the reliability of mathematical systems and the algorithms we build upon them. 

Gödel's Incompleteness Theorems have profound philosophical implications. They reveal that the quest for a complete, consistent foundation for mathematics is a fool's errand, a mirage that vanishes as we approach it. The theorems also force us to confront the nature of truth itself, as they draw a distinction between truths that can be proven and those that remain unprovable yet true.

## Echoes of Gödel from Mathematics to AI
The impact of Gödel's theorems extends far beyond the realm of pure mathematics. Furthermore, Gödel's theorems have played a pivotal role in shaping our understanding of artificial intelligence, as they demonstrate that no machine can ever possess a complete and consistent understanding of mathematics.

In computer science, the Church-Turing Thesis  and the Halting Problem share a kinship with Gödel's discoveries, as they too reveal the limits of computation and the boundaries of algorithmic knowledge. The Church-Turing Thesis states that with enough time and resources any function that can be computed by a human could also be computed by a machine, however the Halting problem implies that there are limits to what machines can compute: problems beyond comprehension.

In practice, this means that while large language models and ever emerging AIs can perform impressive feats of language processing and generation, they aren't capable of true understanding or creativity.

Until next time,

--Explosion--
