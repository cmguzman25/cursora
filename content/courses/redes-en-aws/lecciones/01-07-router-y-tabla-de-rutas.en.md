# 1.7 — The router and the route table

> Module 1 · Networking without the cloud · Lesson 7 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What a router does when a packet reaches it, and how it decides where to send
it. You are going to read your first route table and apply the one rule that
matters for interpreting it. This is the lesson that turns AWS's tables from
hieroglyphics into something obvious.

## 🤔 Before we start

1. In lesson 1.4 we saw what `0.0.0.0/0` means. Do you remember?
2. If a station has a sign saying "platforms 1 to 10 to the right" and another
   saying "platform 7 up the stairs", which do you follow to reach 7?
3. How does the mail carrier in your neighborhood know what to do with a letter
   for another country?

## 📐 The idea

A **router** is a machine connected to two or more networks at once. That is its
entire definition. It has a foot in each neighborhood, and that is why it can
pass things from one to the other.

When a packet reaches it, it does one thing, and one only. It looks at the
destination address and decides **which way to send it out**. It does not open
it, it does not understand it, and it does not keep it.

To decide, it consults its **route table**. It is a two-column list, and there
is nothing more:

| Destination | Which way out |
|---|---|
| `10.0.1.0/24` | Out leg A |
| `10.0.2.0/24` | Out leg B |
| `0.0.0.0/0` | To the router above |

It reads literally. "If the destination falls inside this range, go out this
way."

The last row is the important one. `0.0.0.0/0` means any address in the world,
so it **always matches**. It is the safety net: when nothing else matches, that
one is used. That is why it is called the default route.

There is the third question from the start. The mail carrier in your
neighborhood does not know the streets of Japan. They only know that what does
not belong to their neighborhood goes to the central office. From there on,
others take care of it.

## 🔬 In detail

One problem is left. If `0.0.0.0/0` matches everything, why does it not always
win?

Because there is a rule, and it is the only one you need:

> **The most specific match wins.** That is, the one with the biggest number
> after the slash.

That is the second question from the start. The platform 7 sign is more specific
than the "platforms 1 to 10" one, so the specific one rules.

Let us see the table above in action, with three destinations:

```text
   destination 10.0.1.55
     does it fit in 10.0.1.0/24?  yes  (/24)
     does it fit in 0.0.0.0/0?    yes  (/0)
     /24 wins  →  leg A

   destination 10.0.9.3
     does it fit in 10.0.1.0/24?  no
     does it fit in 10.0.2.0/24?  no
     does it fit in 0.0.0.0/0?    yes
     /0 wins   →  router above
```

Notice that the router **does not know** whether `10.0.9.3` exists. It sends it
upwards and forgets. If nobody knows anything about that address, the packet is
lost along the way. The network does not tell whoever sent it.

That is the difference between "there is no route" and "the route does not lead
anywhere". In the first case the router refuses right away. In the second it
accepts, sends, and the packet disappears far off. The second case is much
harder to diagnose. AWS puts a name to that situation, and you are going to see
it in lesson 2.7.

One last thing that is uncomfortable at first. A route says which way out, and
nothing more. **It does not say the destination is going to reply.** For there
to be a conversation, the return path has to exist too. And that one is decided
by another table, somewhere else. Half of all network problems are routes that
exist in one direction only.

It is worth closing the mail carrier analogy, because it stops working on
something that hurts. If a letter cannot be delivered, the post office returns
it to you. A router returns nothing: it discards the packet and tells nobody.
Nobody is going to tell you your traffic was lost. That is why these faults are
diagnosed by looking at tables, not by waiting for a notice.

## 🗺️ Where this shows up in AWS

In AWS route tables appear exactly as they are, with the same two columns:
`Destination` and `Target`. What changes is who applies them.

There is no box you can point at. A VPC's router is spread across Amazon's
infrastructure, and we already named it in lesson 1.3. You do not configure it:
you configure its tables.

There are three differences from your home router worth being clear about:

- **The tables are associated with subnets**, not with the router. Each subnet
  looks at its own, and two subnets can decide different things.
- **The `local` row appears on its own and cannot be deleted or edited.** It is
  the one that makes all the VPC's subnets talk to each other. For traffic
  inside the VPC, assume it wins. Diverting it is possible in advanced cases,
  and it falls outside this course.
- **If there is no route out, there is no way out.** Nobody puts one there for
  you. A freshly created VPC is isolated from the world on purpose.

The most-specific-match rule works the same way. You are going to use it in
module 4 for an elegant trick. It consists of sending one specific service's
traffic by a different path, leaving everything else as it was. One single new
row, very specific, and the rest of the table never notices.

That idea is worth keeping from now on. In a route table **you do not modify the
general behavior in order to change one case**. You add a more specific row and
that one wins on its own. Adding is safe, and touching the default row affects
everything at once.

## ⚠️ Don't confuse it with

**Router with the device in your home.** What your provider gave you does four
jobs at once. It is a router, a wireless access point, a firewall, and a
distributor of addresses. Calling it "the router" mixes up four things that in
AWS are four different services.

**A route with a permission.** A route says which way you go. It does not say
who may go. A perfect route to a place does not stop traffic from being blocked,
because permission is another matter. That is lesson 1.12.

**The outbound trip existing with the return trip existing.** They are two
separate decisions, made by different tables. A packet can arrive perfectly well
and the reply never find the way back.

## 🔁 Check yourself

1. What does a router do when a packet reaches it?
2. If a destination fits two routes, which one is used?
3. What happens if the destination fits no route and there is no default route?
4. What are route tables associated with in AWS?

**Answers:** One, it looks at the destination address and decides which way to
send it out. It does not open it or keep it. Two, the most specific one, which is
the one with the biggest number after the slash. Three, the router refuses it
right away, because it does not know what to do with it. Four, with subnets. Each
subnet looks at the table associated with it, and two subnets can have different
tables.

## 🎒 Something to think about

A table has `0.0.0.0/0` towards the internet and `10.0.0.0/8` towards the
office. A packet arrives for `10.50.3.7`. Which way does it go out? Now imagine
somebody adds `10.50.0.0/16` towards a third place. Does the answer change?
Notice that nobody deleted anything, and the behavior is different anyway.
