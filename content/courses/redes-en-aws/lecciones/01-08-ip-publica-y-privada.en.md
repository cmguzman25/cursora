# 1.8 — Public IP and private IP: two worlds and one misunderstanding

> Module 1 · Networking without the cloud · Lesson 8 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

Why your address starts with `192.168` and so does somebody's on another
continent. You are going to see that there are two worlds of addresses with
different rules. And you are going to undo the most dangerous misunderstanding
in the whole course: believing that "private" means "protected".

## 🤔 Before we start

1. At the end of lesson 1.2 a question was left open about repeated addresses in
   different homes. What answer occurred to you?
2. How many buildings in the world do you think have an apartment called "3B"?
3. If somebody tells you they live in "3B", can you send them a letter?

## 📐 The idea

IP addresses are split into two groups, and the difference is not in how they
are written. It is in **who respects them**.

**Public addresses.** They are unique across the whole planet. Somebody hands
them out and keeps count. If you have one, nobody else has it, and any router in
the world knows how to reach it.

**Private addresses.** They are three ranges set aside on purpose for internal
use. Anybody can use them at home or at their company, at the same time, without
asking anybody's permission. They are the three in this table:

| Range | From | To | Where you see it |
|---|---|---|---|
| `10.0.0.0/8` | `10.0.0.0` | `10.255.255.255` | Companies and clouds |
| `172.16.0.0/12` | `172.16.0.0` | `172.31.255.255` | Medium-sized networks |
| `192.168.0.0/16` | `192.168.0.0` | `192.168.255.255` | Homes and small offices |

The rule that changes everything is this: **no router on the internet agrees to
forward a packet towards a private address**. They are agreed to mean "this one
is indoors", and they are discarded at the border.

There are the two questions from the start. There are millions of "3B"
apartments in the world, and the name works perfectly well inside its building.
What you cannot do is send a letter with only that.

And there too is the answer to what was left open in lesson 1.2. Your
`192.168.1.10` and somebody's in another city can be identical. They are on
different networks that cannot see each other. The rule about not repeating
addresses applies within one network, not between separate networks.

## 🔬 In detail

These ranges were not set aside for elegance. They were set aside because the
addresses were running out, as you saw in lesson 1.2: there are only 4.3
billion.

The arithmetic does not work. Imagine every phone and every television needed a
globally unique address. We would have run out of them twenty years ago.

The answer was to break the problem up. Each home and each company uses private
addresses internally, which cost nothing and repeat freely. Facing outwards,
everybody shares a few public ones. That way a building of a hundred machines
consumes one single address in the world.

The arrangement has a side effect worth seeing right now. Private addresses are
**free and abundant**, and public ones are scarce and paid for. The range
`10.0.0.0/8` gives you sixteen million addresses without asking anybody's
permission.

That is why in the cloud nobody skimps on private addresses. Asking for a `/16`
for a VPC with twenty machines is not wasteful: it is leaving yourself room.
What does get skimped on is the public side, and you will see its price in
lesson 2.8.

That leaves an obvious question. If my machine has an address the internet does
not accept, how do I load a page? The answer takes up the whole of lesson 1.9,
and it is called NAT. The summary for now: somebody swaps your address for a
public one on the way out, and undoes it coming back.

There is a detail worth pinning down right away. A machine with a private
address **does not have a hidden public address**. It is not that it has both.
It has one, the private one, and something else lends it the public one for a
moment as it passes.

The "3B" analogy stops working on one thing, and it matters. Inside a building
you can ask the doorkeeper about another building's 3B, and they might point you
the right way. On the internet there is nobody to ask. It is not that routers
cannot reach a private address: it is that they have agreed not to try.

## 🗺️ Where this shows up in AWS

When you create your VPC you are going to choose a range, and AWS makes you
choose it from these three. That is why this course's examples start with `10.`.
It is the custom in the cloud: it is the biggest range and it leaves plenty of
room to grow.

There are two consequences worth flagging ahead of time:

- Every instance is born with a private address, and nobody takes that one away.
  If it also needs to talk to the internet, something gets added on top.
- If two VPCs use the same range, **they cannot be connected to each other**. It
  is the overlapping ranges problem, and in lesson 5.4 you will see why it has no
  comfortable solution.

That is why choosing a VPC's range looks trivial and is not. You are not
choosing a nice-looking number: you are deciding who you can connect to three
years from now. Lesson 2.2 is entirely about that.

## ⚠️ Don't confuse it with

**Private with secure.** This is the mistake that costs the most, so it is worth
saying without hedging. A machine having a private address protects it from
nothing. If something is already inside your network, or if there is an open path
towards it, it reaches it anyway. Private describes **how it is routed**, not who
has permission. Permission is lesson 1.12.

**Private with invisible.** A private address is perfectly visible to all its
neighbors. Inside the building, anybody can find "3B".

**Your public address with your machine's.** The public one you see when you
search "what is my IP" is configured on none of your machines. It is the one
belonging to the device at the border, and everybody in the house shares it. This
already came up in lesson 1.2, and now you understand why it happens.

## 🔁 Check yourself

1. What are the three private ranges?
2. What does an internet router do with a packet addressed to `10.0.1.5`?
3. Why can your home address match somebody else's?
4. Does having a private address protect anything?

**Answers:** One, `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. Two, it
discards it. Those addresses are agreed to be internal and are not forwarded.
Three, because they are on different networks that cannot see each other. The
no-repeating rule applies within one network. Four, no. It describes how traffic
is routed, not who has permission to come in.

## 🎒 Something to think about

A company has two offices and both use `192.168.1.0/24`. They decide to join
them with a cable so they work as a single network. What do you think happens on
day one? Think about a machine `192.168.1.20` in office A sending something to
`192.168.1.20` in office B.
