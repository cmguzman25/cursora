# 1.5 — Subnets: why you would split a network into pieces

> Module 1 · Networking without the cloud · Lesson 5 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

Why nobody builds a flat network with every machine together, even though it
would be simpler. There are three reasons, and all three explain decisions you
are going to make in AWS. By the end you will know when splitting a network is
worth it and, the less-asked question, when it is not.

## 🤔 Before we start

1. In lesson 1.2 we saw what an IP address really identifies. Was it the
   machine, the person, or neither of the two?
2. Why does a hospital separate the emergency room from the clinics, if it is
   all the same building?
3. If a ship is split into watertight compartments and water gets into one,
   what happens to the others?

## 📐 The idea

A **subnet** is a piece of a network, with its own range of addresses. Splitting
`10.0.0.0/16` into four `/18`s gives you four subnets, each with its own
neighborhood. With the notation from lesson 1.4 you can already read those
sizes. In lesson 1.6 you will learn to work out where each piece begins and
ends.

Today the question is not how you split. It is **why** bother. There are three
reasons, and they are very different from each other.

**Reason one: giving different rules to different groups.** Put your databases
in a separate piece. Now you can say "this piece is only entered from that
other one". With everything mixed together, that sentence cannot even be
formulated. Grouping is the step before any rule.

**Reason two: limiting the damage.** If something goes wrong in a subnet, the
problem tends to stay inside. An infected machine has its neighbors within
reach. To leave the neighborhood it has to pass through a place where somebody
can stop it. There is the third question from the start.

**Reason three: deciding where things are.** A subnet can be tied to a physical
place: a building, a floor, a data center. That is the least obvious reason and
the one that matters most in AWS.

The three boil down to one sentence: **a subnet is the unit you group with**.
And you group in order to be able to say something about the whole group.

## 🔬 In detail

Splitting has a price, and it is worth knowing it before you split out of
habit.

**You lose addresses.** Every subnet reserves some for itself. If you split a
`/24` into four `/26`s, you pay that reservation four times instead of once.
With small subnets, the waste really shows.

**You add a hop.** Two machines in the same neighborhood talk directly. If you
separate them, now somebody is needed to route between them. That is one more
place where something can fail, and one more place to configure.

**You force yourself to get the size right.** A subnet is not enlarged
afterwards. If you come up short, the usual way out is creating another and
redistributing, which is more work than it sounds.

Out of that comes a practical criterion for not overdoing it:

| Split when | Don't split when |
|---|---|
| The groups need different rules | You only want to "be tidy" |
| You want to contain a problem | The machines are few and do the same thing |
| The things go in different places | The only motive is that it looks nice |

A frequent mistake is splitting by type of application, creating one subnet per
system. That multiplies the work without giving anything back.

What usually works is splitting by **level of exposure**. What faces the
internet goes in one place. What should never be seen from outside goes in
another. Normally those two groups cover almost everything.

The criterion works because it matches the question that really matters: "does
it matter if this one is exposed?". Two machines with the same answer can share
a subnet with no problem, even if they do completely different things. Two
machines with opposite answers should never share one, however much they belong
to the same system.

What is left is saying where the building analogy stops working, and it is in
the size. A floor is built from however many meters you want. A subnet can only
have powers of two: 16, 32, 64, 128 addresses. There is no subnet of a hundred,
and lesson 1.6 explains why.

## 🗺️ Where this shows up in AWS

Here reason three becomes mandatory, and it is the most important rule of this
lesson:

> In AWS, **a subnet lives in one single availability zone**. It cannot stretch
> across two.

An availability zone is a group of data centers separated from the others. It
has its own power and its own network. If one goes down, the others keep
working.

That rule has a consequence a lot of people discover late. For a system to
survive one zone going down, it needs machines in **two zones**. And since each
subnet is in a single zone, that means **two subnets**.

That is why almost every AWS network you are going to see has its subnets in
pairs. One public in zone A and another public in zone B. One private in zone A
and another private in zone B. It is not an architect's obsession: it is the
only way of being in two places.

The other consequence is that in AWS you end up splitting more than you would in
an office. Not because more control is needed, but because the geography forces
you. You are going to build it in lesson 2.4.

## ⚠️ Don't confuse it with

**Subnet with VPC.** The VPC is the whole network, with its big range. The
subnets are the pieces inside. A VPC with a single subnet is perfectly valid,
and it is also perfectly fragile: it lives in one single zone.

**Splitting the network with setting rules.** They are two different things done
in different places. Splitting groups. The rules come afterwards, and they lean
on those groups. A subnet on its own blocks nothing.

**Public subnet with secure subnet.** "Public" and "private" are not subnet
types you pick from a dropdown. They are the result of whether or not the subnet
has a route out. You will see that in lesson 2.7.

## 🔁 Check yourself

1. What are the three reasons for splitting a network into subnets?
2. Name two prices you pay for splitting.
3. In AWS, how many availability zones can a subnet be in?
4. Why do AWS subnets usually come in pairs?

**Answers:** One, giving different rules to each group. Limiting the damage when
something goes wrong. And deciding where things physically are. Two, you lose
addresses on every reservation and you add a hop to route. You also force
yourself to get the size right first time. Three, in one single zone. Four,
because surviving a zone going down requires being in two, and each subnet is
only in one.

## 🎒 Something to think about

Imagine an online store with three parts. The pages the customer sees, the logic
that works out the prices, and the database. How many subnets would you make?
Think about it by level of exposure first. Then multiply by the number of zones.
Do you get the same number you expected when you started?
