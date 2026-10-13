# 0.3 — First look: the network AWS already gave you

> Module 0 · Getting set up · Lesson 3 of 3 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll build today

You are going to open the AWS networking console. Inside there is a network
your account already has set up without you doing anything. You will understand
almost nothing of what you see, and that is exactly the point. By the end you
will have the list of words you are missing, with the lesson where each one is
explained.

## 🤔 Before we start

1. Did you know your AWS account already has a network created from day one?
2. When you open a new tool and see ten words you do not know, what do you
   usually do?
3. Which do you think helps more: having something explained and then seeing it,
   or seeing it first without understanding it and being told afterwards?

## 📐 The idea

When AWS opens an account for you, it creates a complete network in every
region, ready to use. It is called the **default VPC** (Virtual Private Cloud).
It exists so you can launch a server on day one without knowing anything about
networking.

It is convenient and a problem at the same time. Convenient because it works. A
problem because it works without you knowing why. The day something fails, you
will have no idea where to look.

Today you are not going to touch it. You are only going to open it and read it,
the way you read the breaker panel of a new house.

And here is what really matters about this lesson. You are going to see a pile
of words that mean nothing to you yet. That is not a failure on your part or a
sign you are doing badly: it is the normal starting point.

There is the second question from the start. Almost everybody looks up each
word separately and in random order. They end up with ten loose explanations
that do not fit together.

This course does the opposite. It orders them, and each one arrives once you
have what you need to understand it. That is the whole difference, and it is the
reason module 1 runs for thirteen lessons.

## 🛠️ Hands on

> 📍 Course region: **us-east-1 (N. Virginia)**. Check it in the top right
> before you start. Every region has its own default network, so if you look at
> another one you will see different numbers from this lesson's.

**1.** In the console's search bar, type `VPC` and open the service.

*You should see:* a dashboard with a resource summary. On the left, a menu with
`Your VPCs`, `Subnets`, `Route tables`, and `Internet gateways`.

**2.** Open `Your VPCs`. You will see one, flagged as `Default VPC: Yes`.

*You should see:* a network with a range that is almost certainly
`172.31.0.0/16`. Write that number down, you are going to recognize it in
module 1.

**3.** Open `Subnets`. You will see several rows, not one.

*You should see:* between four and six rows. Each one has a different range
(`172.31.0.0/20`, `172.31.16.0/20`…) and sits in a different availability zone.
Notice that the numbers neither repeat nor overlap.

**4.** Open `Route tables` and open the one that appears. Look at the `Routes`
tab.

*You should see:* exactly two rows. One with destination `172.31.0.0/16` and
target `local`. Another with destination `0.0.0.0/0` and a target starting with
`igw-`.

**5.** Open `Internet gateways`.

*You should see:* one, in state `Attached`, connected to that VPC. It is the
same `igw-` you just saw in the route table.

**6.** Go back to `Your VPCs`, select the network, and look for the
`Resource map` tab.

*You should see:* a drawing with the VPC, its subnets, and its connections. It
is the same network you just walked through by hand, at a glance.

## ▶️ Check it works

Nothing went right or wrong here, because you created nothing. What you do have
to be able to do is copy these four pieces of data from your account:

```text
   Default VPC range              172.31.0.0/16
   Number of subnets              (count the rows)
   Rows in the route table        2
   Internet gateways              1, in state Attached
```

And now this lesson's real deliverable: **the map of what you do not
understand**. Every word you just saw, with the lesson that explains it.

| What you saw | What it is, for now | Explained in |
|---|---|---|
| `172.31.0.0` | An IP address | lesson 1.2 |
| `/16`, `/20` | CIDR notation | lesson 1.4 |
| Subnet | A subnet | lesson 1.5 |
| Route table, target | A route table | lesson 1.7 |
| `local` | The network's internal router | lesson 1.7 |
| `0.0.0.0/0` | The default route | lesson 1.4 |
| `igw-`, Internet gateway | The way out to the internet | lesson 2.7 |
| Security group | A firewall with memory | lesson 1.12 |
| Availability zone | Where each subnet physically sits | lesson 1.5 |

Keep this table. It is the index of your own confusion, and in thirteen lessons
you will be able to cross out every row.

Notice one thing before you close it. Eight of the nine rows are explained in
module 1, which never touches the console. Only one is specific to AWS. That
says something important: what you are missing is not AWS, it is networking.

## 🧯 If something breaks

**No VPC appears at all.**
Cause: someone deleted the default network, or the account belongs to an
organization that creates accounts without one. It is more common than it sounds
in company accounts.
Fix: there is nothing to fix. In module 2 you are going to build your own from
scratch, which is what really matters. Read this lesson and move on.

**You see many more VPCs than you expected.**
Cause: it is a shared account, or one with things created earlier.
Fix: look only at the one that says `Default VPC: Yes` and leave the rest alone.

**The numbers do not match this lesson's.**
Cause: nearly always, you are in another region.
Fix: switch to `us-east-1` in the top right. If you still see a different range,
that is fine: what matters is the shape, not the exact number.

## 🧹 What stays running

**What you created:** nothing. This lesson is look-only.

**What gets deleted now:** nothing, and one point is worth repeating. **Do not
delete the default VPC.** It costs no money, and in module 2 you are going to
build yours next to it without touching this one.

**What stays alive:** nothing stays running on your side. The default network
was already there before this lesson, and it is free. A VPC, its subnets, its
route tables, and its gateway are not charged for existing.

**Check nothing extra was left behind:** open `Your VPCs` and confirm there are
still the same ones as when you started.

## 🔁 Check yourself

1. What is the default VPC and why does it exist?
2. How many subnets does it have, and what makes them different from each other?
3. How many rows does its route table have, and what does having two mean?
4. Why does this lesson ask you to look at something you do not understand yet?

**Answers:** One, a complete network that AWS creates in every region when you
open the account. It exists so you can launch a server without knowing
networking. Two, one per availability zone, each with a different range that
does not overlap the others. Three, it has two rows. One for traffic inside the
network, and one for everything else, which goes out to the internet. Four,
because seeing it first gives the explanation something to hold on to later.

## 🎒 Something to think about

Look at the route table again, the one with two rows. One says `172.31.0.0/16`
and the other says `0.0.0.0/0`. If something arrives for the address
`172.31.5.9`, both rows could apply. Which one do you think wins, and why? Do
not look up the answer: write it down and compare it in lesson 1.7.
