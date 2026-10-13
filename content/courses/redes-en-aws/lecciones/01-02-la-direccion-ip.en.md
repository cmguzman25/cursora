# 1.2 — The IP address: what it identifies and what it doesn't

> Module 1 · Networking without the cloud · Lesson 2 of 13 · ⏱️ 9 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What an IP address is, and above all **what it is not**. Almost everybody
believes an IP identifies a machine, or worse, a person. It identifies neither
of those. Understanding what it really identifies will save you half a dozen
confusions later on.

## 🤔 Before we start

1. If they move you to another desk at the office, does your name change or
   does your extension number change?
2. A person can have a landline and a mobile. Which of the two numbers "is"
   that person?
3. What would happen if two houses on the same street had the same number?

## 📐 The idea

In the previous lesson it became clear that a network needs a way of naming
each participant. The **IP address** is that name. The two letters come from
*Internet Protocol*, the agreement every network in the world uses to deliver
packets.

It is written as four numbers separated by dots. For example `192.168.1.10`, or
`10.0.1.47`. Each of the four runs from 0 to 255, and none of them can go over.

So far, what everybody knows. Now the part almost nobody says.

**An IP address does not identify a machine. It identifies a point of
connection to a network.** It is the desk number, not your name.

That difference has three consequences, and all three will come up for you:

- If a machine connects to two networks, it has two addresses. Your phone does
  it every day, with the home network and the mobile data one.
- If you move the machine to another network, its address changes. The laptop
  does not carry its number with it: the network it joins gives it one.
- If you switch the machine off and switch another one on, that other one may
  receive the same address. The desk is still there even if who sits at it
  changes.

There is the first question from the start. They move you and your extension
changes, but you are still you. The address describes **where you are
connected**, not **who you are**.

## 🔬 In detail

Those four numbers are not an arbitrary design decision. An IP address is
really a binary number of **32 bits**. Writing it out as thirty-two ones and
zeros would be unbearable, so it is cut into four groups of eight.

Each group of eight bits is called an **octet**, and that is where the limit of
255 comes from. With eight bits the largest number that fits is 255. There is no
address carrying a 256, and if you see one, it is written wrong.

```text
   192  .  168  .    1  .   10
    │       │        │       │
 8 bits  8 bits   8 bits  8 bits   =  32 bits in total

 minimum value of each octet:   0
 maximum value of each octet: 255
```

With 32 bits you get about 4.3 billion different addresses. They looked
infinite in 1981. Today there are more connected devices than addresses. That
problem explains two whole lessons of this module: 1.8 and 1.9.

One question is still unanswered. Where does a machine get its address from?

There are two paths. On the first one you set it by hand, and it never changes.
The second is the usual one: the machine asks for it when it joins the network.
Somebody lends it one for a while, and that "somebody" is usually the same
device that connects you to the street.

The second path is what makes your phone work anywhere without you configuring
anything. It is also what makes your laptop's address change between home and
the office. It is not a fault: it is the design.

And here the desk analogy stops working, at the point that throws people most.
Your extension is unique within the company. A private address is not unique in
the world: the same `192.168.1.10` exists at the same time in millions of
homes. It sounds impossible right now, and it gets resolved in lesson 1.8.

There is one rule that is absolute, and it is the third question from the start.
Within one network, **two participants cannot have the same address**. If it
happens, messages start reaching the wrong party, intermittently and in a way
that is hard to diagnose. It is the equivalent of two houses with the same
number.

Watch the nuance: the ban applies within one network. On different networks,
the same address can repeat with no problem. That looks like a contradiction
now, and it stops looking like one in lesson 1.8.

## 🗺️ Where this shows up in AWS

This is where AWS gets surprisingly literal, and where a lot of people get lost
for not knowing what is above.

In AWS, an IP address **does not belong to the instance**. It belongs to a
virtual network card, which can be created, detached, and plugged into another
machine. That card has a name of its own and lives on a specific network.

Out of that come things that look like magic and are not. An instance can have
two cards and be on two networks at once. You can shut a machine down, move its
card to another one, and the address travels with the card.

It also explains a classic scare. If you stop an instance and start it again,
its public address can change. The private one does not: the network reserves
that one as long as the card exists. In lesson 2.8 you will see how a public
address is pinned so it stops changing.

And borrowing the address happens in AWS too, even if you do not notice. Your
instance starts with no address and asks for one, just like your phone at home.
The difference is that the one lending it is the network itself. And it always
gives the same one, as long as the card still exists.

That is why in AWS you do not configure the address inside the machine. It is
decided outside, when the card is created. If you log in to an instance and
change its address by hand, it will stop working. The AWS network only delivers
packets to the address it assigned itself.

## ⚠️ Don't confuse it with

**The address with the name.** `10.0.1.47` is the address. `servidor-web` is a
name somebody invented so as not to have to remember it. Translating from one
to the other is DNS's job, and that is lesson 1.11.

**Your address with the one the internet sees.** If you search for "what is my
IP", the site gives you a number that is **on none of your machines**. It is
the one belonging to the device that connects you to the street. Every machine
in your home shares that one, and you will see why in lesson 1.9.

**An address with a person.** An address identifies a point of connection, and
anyone could be using that point. Your whole home shares it, it changes when you
restart the device, and tomorrow another customer may have it.

## 🔁 Check yourself

1. What exactly does an IP address identify?
2. Why can no octet be worth 256?
3. Can one machine have several addresses at once?
4. In AWS, what does an instance's private address belong to?

**Answers:** One, a point of connection to a network. Not a machine and not a
person. Two, because each octet is eight bits, and the largest number that fits
in eight bits is 255. Three, yes, one for each network it is connected to. Your
phone does it daily. Four, to the virtual network card, not to the instance.
That is why the card can be moved with its address in tow.

## 🎒 Something to think about

Look at the address your computer at home has right now. It almost certainly
starts with `192.168`. Ask somebody who lives in another city about theirs. It
is very likely to start the same way, and it may be identical. How can that be,
if a moment ago we said two participants cannot share an address?
