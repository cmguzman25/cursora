# 1.12 — The firewall: stateful and stateless

> Module 1 · Networking without the cloud · Lesson 12 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

The difference between a firewall that remembers and one that does not. It is
the highest-return lesson of the module. Without it, the difference between
AWS's two firewalls gets memorized and forgotten. With it, it works itself out
and you never look it up again.

## 🤔 Before we start

1. In lesson 1.9 we saw a table that was only written on the way out. What was
   it for?
2. One doorkeeper writes down who leaves the building. Another writes nothing
   and only looks at a list. How are they going to behave differently?
3. If you give permission to ask a question, have you given permission to
   receive the answer?

## 📐 The idea

A **firewall** looks at every packet and decides whether it passes or not. It
compares the packet against a list of rules, and the answer is let through or
discard.

So far, nothing new. What changes everything is **whether it remembers what it
already saw**.

**Stateful.** It keeps a table of the open conversations. When you let something
out, it writes that conversation down. When the reply comes back, it recognizes
it and lets it in by itself, without consulting any rule.

**Stateless.** It remembers nothing. Every packet is judged on its own, as if it
were the first in the world. The reply to something you asked for is just
another packet, and it has to be explicitly allowed.

There is the second question from the start. The doorkeeper who writes things
down knows you are coming back. The one who writes nothing sees you as a
stranger every time.

The practical consequence boils down to one sentence:

> In a stateful firewall, you allow the **outbound** trip and the return comes
> included. In a stateless one, you have to allow **both**.

And that sentence explains why the stateless one has a reputation for being
confusing. It is not stricter or more secure. It is that it makes you write
twice as much, and half of what you write is counter-intuitive.

## 🔬 In detail

Let us go to the specific case, because this is where it clicks all at once.

Your server wants to download an update from a site on the internet. From
lesson 1.10 you know that conversation has two ports. The destination one is
443. The source one is chosen at random by your machine among the high ones, and
it is ephemeral.

With a **stateful** firewall, you write one rule:

```text
   OUTBOUND:  allow TCP destination 443    → done
```

The reply comes back and gets in by itself. The firewall recognizes it.

With a **stateless** firewall, two are needed:

```text
   OUTBOUND:  allow TCP destination 443
   INBOUND:   allow TCP destination 1024-65535
```

Look closely at the second. You are allowing in **the whole range of high
ports**, because you do not know which one your machine chose. That is the price
of remembering nothing.

That second rule is the reason almost nobody uses stateless firewalls as their
main defense. For the replies to come back, you end up opening an enormous
range. What it really contributes is blocking one specific thing outright, with
no exceptions.

There is a second difference worth pinning down. A stateless firewall usually
allows **explicit denial**. You can say "this address, no, never". The stateful
one normally only allows, and whatever is not allowed stays out by omission.
They are two different ways of saying no:

| | Stateful | Stateless |
|---|---|---|
| Remembers conversations | Yes | No |
| The return has to be allowed | No | Yes |
| Something specific can be denied | Normally no | Yes |
| Rule by omission | What is not allowed is discarded | Everything is evaluated in order |

What is left is saying where the doorkeeper analogy stops working. A doorkeeper
remembers your face for years. The conversation table does not: it expires in
minutes if nothing goes through. A connection that stays quiet too long stops
being written down. The reply arriving afterwards is discarded, as if you had
never asked for it.

## 🗺️ Where this shows up in AWS

AWS has both, and now you can work out how each one behaves:

- The **security group** is **stateful**. It applies to each machine's network
  card. It only allows, never denies. If you let traffic out to 443, the reply
  comes back by itself.
- The **network access control list** is **stateless**. It applies to the whole
  subnet. It allows and denies, with numbered rules evaluated in order. If you
  let traffic out to 443, you also have to allow the high ports inbound.

Out of that comes the classic AWS fault, which you are going to see a thousand
times. Somebody touches the subnet's list, allows what they want coming in, and
everything stops working. The cause is that they did not allow the return of
what goes out.

It also explains the remark at the end of lesson 1.10. In a security group the
ephemeral ports are not needed, and in a network list they are. It is not an
inconsistency on AWS's part: they are two different kinds of firewall.

Both act on the same traffic, and the whole of module 3 is about this.

## ⚠️ Don't confuse it with

**Firewall with route.** A route says which way you go, and a firewall says who
may go. You can have a route and be blocked. You can have permission and have no
way through. They are two different questions, and it is best to check them
separately and in that order.

**Denying with not allowing.** They are not the same. If something is not
allowed, any later rule could allow it. If it is explicitly denied, there is no
going back. That difference decides which of the two to use.

**Stateless with more secure.** It is a frequent reflex and it is false. Not
remembering forces you to open an enormous range of return ports. The stateful
one ends up being stricter in practice. The only reply it lets in is the one from
a conversation you started.

## 🔁 Check yourself

1. What does a stateful firewall remember, and what for?
2. Why does a stateless one force you to allow ports 1024-65535 inbound?
3. Which of the two can deny something explicitly?
4. In AWS, which one is stateful and what does it apply to?

**Answers:** One, the open conversations. That way it recognizes the reply to
something that went out and lets it in with no rule. Two, because it does not
know which ephemeral port the machine chose, and the reply comes back to that
one. Three, the stateless one. The other normally only allows. Four,
the security group, and it applies to each machine's network card.

## 🎒 Something to think about

A machine has a security group that allows inbound traffic only to port 443.
Even so it downloads updates from the internet with no trouble. That uses
outbound ports and replies coming back. Why does it work? And now the real
question: would it still work if that group were stateless?
