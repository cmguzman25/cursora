# 1.3 — The mask: where your network ends and the world begins

> Module 1 · Networking without the cloud · Lesson 3 of 13 · ⏱️ 9 min read · 💚 Cost: $0

## 🎯 What you'll understand today

Why an address on its own is no use at all. And what that thing called a
**mask** is, the one that always appears next to it. By the end you will be
able to answer the one question your machine asks itself before sending
anything. That question is: "is this for a neighbor, or do I hand it to the
router?".

## 🤔 Before we start

1. If I give you the phone number `4567`, can you call? What are you missing?
2. Looking at two postal addresses, how do you know whether they are in the
   same neighborhood?
3. When you send something by mail inside your own building, do you take it to
   the mailbox on the street or carry it up yourself?

## 📐 The idea

An address like `10.0.1.47` carries two parts inside it. At a glance you cannot
see where one ends and the other begins:

- The **network** part. The neighborhood. Everybody who is together shares it.
- The **machine** part. The house number within that neighborhood. It is
  different for each one.

The problem is that the address carries no marker saying where the cut is.
`10.0.1.47` could be "neighborhood `10`, house `0.1.47`" or "neighborhood
`10.0.1`, house `47`". Those are completely different situations.

The **subnet mask** is what marks the cut. It is written like an address, and
by far the most common one is `255.255.255.0`.

Do not worry yet about the word "subnet" in that name. It is the term in use,
and it will make sense in lesson 1.5. Today you can call it just the mask.

It reads like this: where there is a 255, that part belongs to the
neighborhood. Where there is a 0, that part belongs to the house number.

```text
   address:    10 . 0 . 1 . 47
   mask:      255 .255.255.  0
               ───────────   ──
             neighborhood   house

   neighborhood: 10.0.1     house: 47
```

With that mask, `10.0.1.47` and `10.0.1.200` are neighbors: they share a
neighborhood. But `10.0.1.47` and `10.0.2.200` are not. Look at the third
number: it changes from 1 to 2, and the third number is part of the
neighborhood.

## 🔬 In detail

This whole story exists so your machine can answer **one single question**. It
answers it before sending absolutely every packet:

> Is the destination in my own neighborhood, yes or no?

If the answer is yes, it delivers it directly. The neighbor is right there.

If the answer is no, your machine has no idea how to get there. So it does the
only sensible thing: it hands it to the **router** and washes its hands of it.

About the router you only need to know one thing today. It is a machine
connected to two networks at once, and that is why it can pass things between
them. It is the device everything that does not belong to the neighborhood gets
handed to. Lesson 1.7 is entirely about it.

There is the third question from the start. What belongs to your building you
carry up yourself, what belongs outside goes to the mailbox on the street.

That decision, repeated thousands of times a second, is nearly everything a
machine does on a network. It is made by comparing the destination with its own
address, using the mask as a template.

Let us look at the three cases, with the same machine `10.0.1.47` and mask
`255.255.255.0`:

| Destination | Same neighborhood? | What it does |
|---|---|---|
| `10.0.1.200` | Yes, `10.0.1` matches | Delivers it directly |
| `10.0.2.200` | No, the third one changes | Hands it to the router |
| `8.8.8.8` | No, everything changes | Hands it to the router |

Notice something important. The machine **does not know** whether `10.0.2.200`
exists, or where it is, or whether it can be reached. That is not its problem.
It only knows it is not a neighbor, and that this is what the router is for.

That deliberate ignorance is what lets the network scale. No machine needs to
know the whole map. It only needs to know who its neighbor is and who to bother
when it is not.

Which leaves a loose end. If the destination is not a neighbor, your machine
hands it to the router. But the router is also a machine with an address of its
own. How does yours know which one it is?

It does not guess. It has to be told. That address is called the **default
gateway**. It is the third piece of data every machine needs in order to work
on a network. The three are these:

| Data | What it says | Example |
|---|---|---|
| Address | Who I am | `10.0.1.47` |
| Mask | Where my neighborhood's border is | `255.255.255.0` |
| Gateway | Who I hand what is not local to | `10.0.1.1` |

Notice that the gateway **is inside the neighborhood**. It has to be, because
your machine only knows how to deliver directly to its neighbors. If the
gateway were outside, you would need a gateway to reach the gateway.

By habit it is usually given the first usable address in the range, the one
ending in `.1`. It is not a rule, it is a convention. In AWS it always holds,
and in lesson 2.5 you will see why there it is not negotiable.

Before moving on, it is worth saying where the neighborhood analogy stops
working. A real neighborhood is drawn by geography, and you can see it by
leaning out of the window. Here the border is decided by a number somebody
wrote. Change the mask and the neighborhood changes, without any machine having
moved an inch.

## 🗺️ Where this shows up in AWS

When you create a subnet in AWS, you will give it a range like `10.0.1.0/24`.
That `/24` is the mask, written another way, and lesson 1.4 is entirely about
that notation.

What matters today is the consequence. Two instances in the **same subnet** talk
to each other directly, with nothing deciding for them. Two instances in
**different** subnets need somebody to route. That holds even if they are in the
same VPC and a meter apart.

That is why "are they in the same subnet?" is the first question when something
will not connect in AWS. The answer changes which pieces are involved, and
therefore where you have to look.

The gateway exists in AWS too, and you do not configure it. Every subnet has
its own, always at the first **usable** address in the range. In `10.0.1.0/24`
it is `10.0.1.1`, because `10.0.1.0` is the neighborhood's name. AWS hands it to
each instance automatically.

It is not a device you can see in the console: it is a function spread across
Amazon's network. They call it the VPC's implicit router. It is the reason two
subnets in the same VPC talk to each other without you doing anything.

## ⚠️ Don't confuse it with

**The mask with the address.** They are written the same way and they are not
the same thing. The address says who you are. The mask says where the border is.
Two machines on the same network have different addresses and the **same** mask.

**Same neighborhood with same cable.** Two machines can be plugged into the same
device and have masks that put them in different neighborhoods. Then they do not
talk directly, even though the cable is the same. The border is logical, not
physical, and that is exactly the idea that makes the cloud possible.

**More mask with more security.** The mask protects nothing. It only decides who
is a neighbor of whom. Preventing two machines from talking is another matter,
and it is lesson 1.12.

## 🔁 Check yourself

1. What two parts does an IP address carry inside it?
2. What question does a machine answer using the mask?
3. With mask `255.255.255.0`, are `10.0.5.9` and `10.0.6.9` neighbors?
4. What does a machine do when the destination is not in its neighborhood?

**Answers:** One, the network part and the machine part. The neighborhood and
the house number. Two, whether the destination is in its own neighborhood or
not. Three, no. The third number changes, and with that mask the third number is
part of the neighborhood. Four, it hands it to the router and washes its hands
of it. It does not know whether the destination exists or how to get there, and
it does not need to know.

## 🎒 Something to think about

Imagine two machines with the same neighborhood address but different masks. The
first believes they are neighbors and sends it a direct packet. The second
believes they are not and replies through the router. Would the conversation
work? Think about the outbound trip and the return trip separately.
