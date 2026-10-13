# 1.1 — What a network is: two machines and a cable

> Module 1 · Networking without the cloud · Lesson 1 of 13 · ⏱️ 9 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What a network is, in the most literal sense. You will start with two machines
and a cable. You will finish understanding why a network needs three things and
not one. This is the lesson that holds up the twelve that follow. Everything
that comes later solves a problem that appears today. Addresses, in lesson 1.2.
Routes, in lesson 1.7. Firewalls, in lesson 1.12.

## 🤔 Before we start

1. If you wanted to pass a file to the computer next to you without internet,
   what would you do?
2. In an office with a hundred people, how does an envelope reach the right
   desk?
3. Why does a phone need a number and a house need an address?

## 📐 The idea

A network is a group of machines that can send each other messages. That is
all. No internet is needed, no cloud, no company selling it to you. Two
computers and a cable between them are already a network.

With two machines the problem is simple. Whatever leaves through the cable can
only arrive at one place. There is nothing to decide.

Add a third one and the first real problem appears. Every machine needs a cable
to each of the others. With three that is three cables. With ten it is
forty-five. With a hundred, almost five thousand. Connecting everything to
everything does not work.

The answer is to put something in the middle. A device all of them connect to,
which hands out whatever it receives. Each machine has a single cable, the one
going to the center:

```text
   with nothing in between      with something in between

   A ───── B                    A       B
   │ ╲   ╱ │                     ╲     ╱
   │  ╲ ╱  │                      ╲   ╱
   │   ╳   │                     ┌──────┐
   │  ╱ ╲  │                     │      │
   │ ╱   ╲ │                      ╱   ╲
   C ───── D                    C       D

   6 cables, and they grow      4 cables, and they grow
   very fast                    one at a time
```

But the device in the middle receives a message and has to decide who to hand
it to. For that, the message has to say who it is for. And for it to be able to
say so, every machine needs something that identifies it.

There is the second question from the start. An envelope reaches the right desk
because a name is written on it, and because somebody reads it and carries it.

So a network needs three things, not one:

- **A path** for the messages to travel along.
- **A way of naming** each participant.
- **Something that decides** where each message goes.

The rest of this module is exactly that. Addresses are the second one. Routes
and routers are the third. The path is given by the cable, or given by AWS.

## 🔬 In detail

The envelope-and-office analogy is going to stay with you all course. It is
worth knowing right away where it stops working.

An envelope is delivered whole. A network message almost never is. What you
send is cut into small pieces, and each piece travels on its own. Each piece is
called a **packet**. It is the unit you will think in from now on.

Every packet carries two pieces of data written on the front: who it comes from
and who it is for. Like the sender and the addressee on an envelope. That front
part is always written the same way, and that is why any device knows how to
read it.

The pieces travelling separately has an awkward consequence. They can arrive
out of order, or one of them may not arrive at all. The network does not
guarantee it. Somebody has to notice and ask for the missing one, and you will
see that in lesson 1.10.

There is a second difference from the office. The device in the middle does not
open the envelopes or understand what they say. It only looks at the addressee
and delivers. That indifference is deliberate. It is the reason the same
network works for an email, a video call, or a backup.

And one question remains that the analogy hides. How does the device in the
middle know which cable each machine is on? Nobody told it when it was plugged
in.

It learns on its own, and it does so in the simplest way possible. Every time a
packet reaches it, it looks at **who it comes from** and notes which cable it
came in on. That is how it builds a list of who is where. And if something
arrives for someone it does not know yet, it sends it out every cable but one.
Not the one it came in on. Then it keeps the reply and notes that one too.

That self-built list is the ancestor of the route tables in lesson 1.7. The
difference will be that route tables are not learned on their own: you write
them. And in AWS you are going to write them by hand.

## 🗺️ Where this shows up in AWS

In AWS you are never going to see a cable. You are not going to buy the device
in the middle either, or choose where it gets plugged in. Amazon already built
the whole building, with its wiring and its devices, and shares it among
thousands of customers.

What you do is decide who belongs to your network and who can talk to whom. You
draw the boundaries on top of infrastructure that already exists.

That is why in AWS networks are **declared**, not assembled. In module 2 you are
going to create your first **VPC** (Virtual Private Cloud). That is the name
Amazon gives a network of yours. You will not be building anything physical.
You will be saying "these machines form a group, and this is their address
plan".

Of the three things in the list above, AWS gives you the first for free and
leaves you the other two. Naming and deciding are still your job. And since
almost nobody explains this to you, it looks as if the cloud had invented new
rules. It did not invent them: they are the same ones as always, with different
buttons.

## ⚠️ Don't confuse it with

**A network with the internet.** The internet is not a network. It is a huge
number of networks connected to each other, which agreed to speak alike. Your
home has a network even if you cut its fiber. What you lose by cutting it is
the connection to the others.

**Being connected with being able to talk.** Two machines plugged into the same
device are connected, and they can still fail to understand each other. They
may be missing a valid address, or there may be something deliberately
preventing it. That difference is the cause of half the problems you are going
to diagnose.

**The network with what runs on top of it.** A page not loading does not mean
the network is failing. The path can be perfect and the server switched off.
Separating those two things is the first step of any diagnosis.

## 🔁 Check yourself

1. What three things does a network need in order to work?
2. Why are machines not all connected directly to each other?
3. What is a packet, and what does it carry written on the front?
4. Of the three things in the first question, which one does AWS give you ready
   made?

**Answers:** One, a path, a way of naming each participant, and something that
decides where each message goes. Two, because the number of cables grows far
faster than the number of machines. With a hundred you would need almost five
thousand. Three, a piece of what you send, carrying on the front who it comes
from and who it is for. Four, the path. Naming and deciding are still yours.

## 🎒 Something to think about

Think about your home. Count how many things are on the same network: phones,
television, console, the device your provider gave you. Which of them acts as
the device in the middle? And how do you think it knows who to deliver each
thing to, if they share one connection to the street?
