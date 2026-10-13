# 1.4 — CIDR notation: what /24 really means

> Module 1 · Networking without the cloud · Lesson 4 of 13 · ⏱️ 9 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What the slash in `10.0.1.0/24` means. Why a smaller number gives a bigger
network. And how to tell at a glance how many addresses fit. You are going to
write this notation in AWS every time you create something. It is worth it
stopping being noise you copy and paste.

## 🤔 Before we start

1. In lesson 1.1 we saw that a network needs three things. What were they?
2. If a smaller number meant "bigger", can you think of an everyday example
   where that happens?
3. How many houses do you think fit in a neighborhood whose name takes up
   almost the whole address?

## 📐 The idea

Writing `255.255.255.0` every time gets tiring. And there is a detail that
makes it redundant. In a mask, the big numbers **always come first** and the
zeros after. You will never see `255.0.255.0`.

If the border always falls in the same place, saying where it is will do. That
is the whole of **CIDR** notation (Classless Inter-Domain Routing). A number
that says **how many bits the network part takes up**.

```text
   255 . 255 . 255 .  0      255 . 255 .  0  .  0
   ─────────────────  ─      ───────────  ───────
    8  +  8  +  8  = 24       8  +  8   =   16
       network      house       network    house

         →  /24                   →  /16
```

Remember from lesson 1.2 that each number in the address is 8 bits. So counting
is adding in eights: one 255 is 8 bits, two are 16, three are 24.

So `10.0.1.0/24` reads: "the first 24 bits are the neighborhood".
Twenty-four bits are three numbers. The neighborhood is `10.0.1` and the last
one is left free.

There is a shortcut worth keeping handy from now on. Divide the number by
eight:

- **It comes out even** (`/8`, `/16`, `/24`). The border falls right between two
  dots, and you can read the neighborhood by eye without calculating anything.
- **It does not come out even** (`/20`, `/26`, `/28`). The border falls
  **inside** a number, and you have to think a bit more. That is lesson 1.6.

As long as you stay on `/8`, `/16`, and `/24`, you will never need a calculator.
Most of the networks you design are going to be there. Sticking to those three
while you learn is a good habit.

And here is the part that throws everybody:

> **The smaller the number after the slash, the bigger the network.**

It is not a quirk. It is arithmetic. The number says how much the
**neighborhood** takes up. If the neighborhood takes up a lot, little room is
left for the houses. If the neighborhood takes up little, an enormous amount of
room is left.

There are the other two questions from the start. The "smaller is bigger" thing
happens in everyday places. Finishing first is better than finishing tenth.
Floor -3 is lower down than -1. The number does not measure the thing: it
measures another one that runs the other way.

And a neighborhood whose name takes up almost the whole address leaves room for
very few houses. That is exactly a `/28`, which you will see in the table below.

## 🔬 In detail

The bits that are not network bits are machine bits. If there are 32 bits in
total and `/24` uses 24, that leaves 8 for the houses. With 8 bits you count up
to 256.

That is where the table worth keeping in your head comes from. You do not have
to memorize all of it: with the three or four in the middle you will survive.

| CIDR | House bits | Addresses | Mental size |
|---|---|---|---|
| `/8` | 24 | 16,777,216 | Enormous. A whole multinational |
| `/16` | 16 | 65,536 | Large. The typical size of a VPC |
| `/20` | 12 | 4,096 | A roomy subnet |
| `/24` | 8 | 256 | The classic subnet |
| `/28` | 4 | 16 | Tiny. The smallest AWS accepts |
| `/32` | 0 | 1 | One single exact address |

Two things about that table are worth noticing.

Every time the number goes up by one, the network is cut **in half**. A `/25`
has half the addresses of a `/24`. A `/26`, a quarter. That is why the sizes are
always powers of two. You will never see a network of exactly 100 addresses: you
ask for a `/25`, get 128, and waste 28.

And `/32` is not a mistake. It means "this exact address and no other". You will
write it often in the firewall rules of lesson 1.12. It serves to allow a single
machine. In AWS, `203.0.113.5/32` means "that one only".

The other extreme exists too, and you are going to use it even more. `0.0.0.0/0`
is zero network bits, that is, no border at all. It means **any address in the
world**. It is the default route out, and that is why it reads as "everything
else".

What is left is explaining where the name comes from. Before 1993 networks came
in three fixed sizes. The size was decided by the address's first number, and
they were called class A, class B, and class C.

The problem was plain. A company with 300 machines did not fit in a class C,
which gave 256. And giving it a class B meant it took 65,536 addresses in order
to waste 65,236. That is how half the internet ran out.

CIDR removed the fixed sizes. Hence the name: **classless** routing. Now you ask
for the size you need, in powers of two, instead of the size you are handed.
Everything you are going to do in AWS works that way.

## 🗺️ Where this shows up in AWS

In AWS this notation is everywhere, and almost always in places where getting
it wrong hurts:

- When you create a **VPC** you give it a range like `10.0.0.0/16`. AWS accepts
  from `/16` to `/28`, and that range **cannot be shrunk afterwards**.
- Each **subnet** takes a slice of the VPC's range, for example `10.0.1.0/24`.
  What a subnet is and why you would split a network is lesson 1.5.
- Each line of a **route table** has a destination in this notation, including
  the `0.0.0.0/0` you just saw. Route tables are lesson 1.7.
- Each rule of a **security group** says which range it accepts traffic from.
  That is where `/32` shows up constantly.

Lesson 2.2 is entirely about how to choose a VPC's range. It is one of the few
AWS decisions that is genuinely hard to undo.

## ⚠️ Don't confuse it with

**The `/24` with the last number.** In `10.0.1.0/24`, the `24` has nothing to do
with the `0` at the end, or with any octet. It is counting bits, and it lives in
a different dimension from the four numbers in front of it.

**Big number with big network.** It is exactly the other way round, and it is
the most repeated beginner mistake. A `/28` has 16 addresses and a `/8` has
sixteen million. If in doubt, think: the number measures the **neighborhood**,
not the houses.

**Total addresses with usable addresses.** A `/24` has 256 addresses, and you
cannot use all 256. There are always some reserved, and in AWS there are more
than usual. That is lesson 2.5.

**Defining a range with referring to one.** When you create a subnet, the CIDR
**defines** which addresses exist there. When you write it in a firewall rule,
it only **points at** a group of addresses that already exists. It is the same
notation doing two different jobs, and it is worth not mixing them up.

## 🔁 Check yourself

1. What exactly does the number after the slash count?
2. How many addresses does a `/24` have? And a `/16`?
3. What does `0.0.0.0/0` mean, and where have you seen it already?
4. Why is a `/16` bigger than a `/24`?

**Answers:** One, how many bits of the address are the network part. The size of
the neighborhood. Two, a `/24` has 256 and a `/16` has 65,536. Three, no border
at all, that is, any address in the world. It is the default route towards the
way out. Four, because the number measures the neighborhood. If the neighborhood
takes up fewer bits, more bits are left free for the houses.

## 🎒 Something to think about

You have the range `10.0.0.0/16` for a company and you are asked to split it
into `/24` subnets. How many do you get? Work it out with the table above, by
comparing each one's number of addresses. And then think about the awkward
question: how many would you get if they asked for `/20` ones?
