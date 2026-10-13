# 1.6 — Working out a range by hand, with no odd formulas

> Module 1 · Networking without the cloud · Lesson 6 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

How to go from `10.0.0.0/18` to "this runs from here to here", with no binary
and no calculator. It is the skill that lets you plan a network on a napkin. It
also avoids the most expensive mistake of all. That mistake is creating two
subnets that overlap, and finding out when there are already machines inside.

## 🤔 Before we start

1. In lesson 1.2 we saw why no number in an address goes above 255. Why was
   that?
2. If a street has blocks of 25 houses numbered from 1, what number does the
   fourth block start at?
3. Which would be quicker for you: dividing 65,536 by 256, or counting in 256s
   until you get there?

## 📐 The idea

There are two cases, and one of the two takes no work at all.

**The easy case: `/8`, `/16`, and `/24`.** The border falls right between two
dots. The range reads by eye. What is network stays fixed, and what is house
runs from 0 to 255:

| Range | From | To |
|---|---|---|
| `10.0.1.0/24` | `10.0.1.0` | `10.0.1.255` |
| `10.0.0.0/16` | `10.0.0.0` | `10.0.255.255` |
| `10.0.0.0/8` | `10.0.0.0` | `10.255.255.255` |

**The case with work: everything else.** Here the border falls inside a number,
and something has to be calculated. But that something is a subtraction.

The trick is called the **block size**, and it is two steps:

1. Look at the mask's value in the number where the border falls.
2. Subtract it from 256. That is how often a new block starts.

There are only seven possible values, and this table has them all. The
"remainder" is what is left over when you divide the CIDR number by 8:

| Remainder | Mask value | 256 minus that | Blocks of |
|---|---|---|---|
| 1 | 128 | 128 | 128 |
| 2 | 192 | 64 | 64 |
| 3 | 224 | 32 | 32 |
| 4 | 240 | 16 | 16 |
| 5 | 248 | 8 | 8 |
| 6 | 252 | 4 | 4 |
| 7 | 254 | 2 | 2 |

Notice the pattern: each row is half the one before. If you remember that 1
means blocks of 128, the rest comes out by halving.

And there is the second question from the start. If the blocks are of 25, the
fourth starts at 76. You count in 25s. Here it is identical, with other numbers.

## 🔬 In detail

Let us take a real case. You have `10.0.0.0/18` and you want to know how far it
reaches.

**Step 1. Where does the border fall?** Divide 18 by 8. That gives 2 with 2 left
over. The first two numbers are all network. The border falls in the **third**
number.

**Step 2. What is the mask worth there?** The remainder was 2. Looking at the
table, a remainder of 2 gives a mask of 192.

**Step 3. Block size?** 256 minus 192 is **64**.

**Step 4. Count.** The blocks start every 64 in the third number:

```text
   10.0.  0.0/18   →   10.0.  0.0  to  10.0. 63.255
   10.0. 64.0/18   →   10.0. 64.0  to  10.0.127.255
   10.0.128.0/18   →   10.0.128.0  to  10.0.191.255
   10.0.192.0/18   →   10.0.192.0  to  10.0.255.255

   four blocks of 64, and the /16 is used up
```

The end of each block is always the number right before the next start. If the
next one starts at 64, this one ends at 63. Nothing more.

Same thing with the border in the last number. With `10.0.1.0/26`: 26 by 8 gives
3 and the remainder is 2. The border falls in the fourth number. A remainder of
2 gives mask 192, and 256 minus 192 is 64. So the blocks are `10.0.1.0`,
`10.0.1.64`, `10.0.1.128`, and `10.0.1.192`.

Notice one thing that is reassuring. Blocks **always start at a multiple of
their size**. If somebody tells you their subnet is `10.0.1.50/26`, it is wrong:
50 is not a multiple of 64. That check catches half the errors without
calculating anything.

And that is where the street analogy stops working, right at the detail that
matters. A street can have blocks of 25 houses if the planner feels like it. A
network cannot. The blocks are always powers of two, and they always start where
they are due. That is why you ask for the size that fits and accept that room is
left over.

## 🗺️ Where this shows up in AWS

The AWS console helps you halfway. When you type a range, it shows you how many
addresses come out. What it does **not** tell you is whether that range clashes
with a subnet you created three months ago.

That check is yours, and that is why this calculation matters. Before creating a
VPC's second subnet, you have to know where the first one ends.

AWS does stop you in two cases. It will not let you overlap two subnets of the
same VPC. And it will not let you use a range that does not fit inside the VPC's
range.

But it does not protect you from the expensive problem, which is overlapping
with **another** network. That shows up when connecting two VPCs, or when
connecting to an office. By then there are machines running and moving the range
is wildly expensive. It is the subject of lessons 5.4 and 6.1.

There is a habit that saves a lot of grief and costs five minutes. Before
creating anything, write the whole allocation in a table, including the pieces
you are not going to use yet:

| Piece | What for | State |
|---|---|---|
| `10.0.0.0/20` | Public subnets | In use |
| `10.0.16.0/20` | Private subnets | In use |
| `10.0.32.0/20` | Databases | Reserved |
| `10.0.48.0/20` | Whatever comes | Free |

Reserving room for what does not exist yet looks like a waste of time. It is the
opposite. Addresses are not spent by writing them on paper. And having the gap
marked stops somebody from occupying it without noticing.

## ⚠️ Don't confuse it with

**The first address with the first usable one.** The first of each block gives
the network its name, and it is not given to any machine. In `10.0.1.0/24`,
`10.0.1.0` is the neighborhood's name. The first one you could use would be `.1`.

**The last address with the last usable one.** The last of each block is
reserved for sending a message to everybody in the neighborhood at once. In a
`/24` that is `.255`. It is not given to anybody either.

**Counting blocks with counting addresses.** A `/18` gives four blocks inside a
`/16`, and each block has 16,384 addresses. They are two different questions and
they get confused often. One asks how many pieces, the other how much fits in
each piece.

## 🔁 Check yourself

1. What are the two steps of the block-size trick?
2. How far does `10.0.64.0/18` reach?
3. Why is `10.0.1.50/26` written wrong?
4. How many `/24` subnets fit in a `/16`?

**Answers:** One, look at the mask's value in the number where the border falls,
and subtract it from 256. Two, as far as `10.0.127.255`. A `/18`'s blocks are of
64, so the next one starts at 128. Three, because 50 is not a multiple of 64,
and a `/26`'s blocks go in 64s. Four, 256. A `/16` has 65,536 addresses and a
`/24` has 256.

## 🎒 Something to think about

You are given `10.0.0.0/16` and asked for three subnets: one for 1,000 machines,
another for 300, and another for 20. Choose each one's size and decide where
each block starts, without them overlapping. Then ask yourself something
awkward: in what order is it best to place them so as to waste less?
