# 0.1 — How to use this course

> Module 0 · Getting set up · Lesson 1 of 3 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What this course promises and what it does not. How it is built. And the two
rules that keep your bill from surprising you. Eight minutes that stop you from
quitting in module 3 without knowing why.

## 🤔 Before we start

1. What happened the last time someone explained networking to you? On which
   exact word did you get lost?
2. When you learn something technical, what works better for you: reading first
   or tinkering first?
3. Have you ever left something running in the cloud and found out when the
   receipt arrived?

## 📐 The idea

This course makes one concrete promise, and it is worth saying up front:

> **By the end you will understand AWS networking, not recognize it.**

Look at the difference. Knowing that an Internet Gateway exists is one thing.
Being able to point at the line of the table that gives your server internet is
another. The first is learned in an afternoon and forgotten in a week. The
second is not forgotten.

Concretely, by the end you will be able to do three things:

- **Draw on paper** the path a message travels, from a machine in your home to
  a server hidden inside AWS, naming every piece it crosses and why it is
  there.
- **Build** from scratch, in the AWS console, a network with public and private
  parts that actually works.
- **Diagnose** why something will not connect, by elimination and in order,
  instead of poking at rules at random until it works.

And here is what this course is **not**. It does not prepare you for any
certification. It is not a catalog of AWS networking services. A service shows
up when it solves a problem you have already felt, and not before. Transit
Gateway does not appear until module 5: until then you have not felt the limits
of what came before.

There is the first question from the start. If you got lost on one specific
word, it was because someone used it before explaining it.

In this course that is forbidden in writing. No lesson may lean on something
that was not taught earlier. And every acronym is spelled out the first time it
appears.

## 🔬 In detail

There are **two kinds of lesson**, and you can tell them apart on the first
line.

The **concept** lessons explain an idea and never touch the console. They are
the majority, and the whole of module 1 is like that: thirteen lessons in a row
without opening AWS. That is deliberate. Whoever enters the console without
those thirteen concepts learns to click, not to network.

The **concept and console** lessons explain an idea and then build it. They go
step by step, and each step tells you what you should see if it went well.

There is the second question from the start. If you are the tinkering type,
module 1 will be hard on you. I am asking you to sit through it anyway: it is
what makes everything else make sense instead of being memorized.

Every lesson ends with a **self-check**. Four questions with their answers,
inside the lesson itself. There is no grade, no exam, and nothing is saved. It
is there so you can test yourself before moving on. If you miss two out of
four, go back.

One more thing about pace. Lessons are 8 to 10 minutes of reading, and they are
meant for one sitting. The console ones also take their time at the keyboard,
which that number does not count.

## 🗺️ Where this shows up in AWS

Two practical rules that hold for the whole course. The first one is money.

This course **does spend**, a little but not zero. Some AWS networking pieces
charge from the first minute: outbound translators, load balancers, tunnels.
That is why every lesson carries a traffic light on its first line:

| Traffic light | What it means |
|---|---|
| 💚 Cost: $0 | Creates nothing that bills, or what it creates is always free |
| 💛 Cost: a few cents | Under 0.50 USD if you follow the steps and delete on time |
| 🔴 Cost: real charges | Bills from the first minute and has no free tier |

Before the first step that starts charging there is always a notice. It carries
the approximate price and an alternative that spends nothing.

The second rule is cleanup, and it answers the third question from the start.
Every lesson that creates something ends by saying what gets deleted now and
what stays alive. And it **names the specific lesson where it gets deleted**.
Never "later on". Nothing you build survives the end of the course.

For all of this to fit together, the environment is fixed: region `us-east-1`,
tag `curso = redes-aws`, and names starting with `redes-`. That way you can
find and delete everything from the course in one go.

## ⚠️ Don't confuse it with

**This course with a certification course.** It does not follow any exam's
syllabus and it will not tell you "this one comes up a lot". If you are also
preparing a certification, what is here will serve you. But the order and the
scope are set by understanding, not by the exam.

**Reading with having understood.** That is the real risk of a reading-only
module like module 1. The self-check at the end is there for exactly that. If
you can answer all four from memory, you understood. If you look at them and
they ring a bell, you did not.

**Going fast with going well.** This course can be read end to end in two
afternoons, and there is no point in doing that. Networking concepts settle
when you bump into them again. One or two lessons a day works better than eight
in one go.

## 🔁 Check yourself

1. What does this course promise, in one sentence?
2. What are the two kinds of lesson, and how do they differ?
3. Why does module 1 never touch the AWS console?
4. What does a lesson that leaves something running have to say?

**Answers:** One, that you understand AWS networking instead of recognizing it.
Two, the concept ones, which explain an idea, and the concept and console ones,
which also build it. Three, because whoever opens the console without those
concepts learns to click and not to network. Four, what gets deleted now, what
stays alive, how much it costs, and in which specific lesson it gets deleted.

## 🎒 Something to think about

Go back to the first question and write down the word you got lost on. It is
probably one of these three: "subnet", which is lesson 1.5, "CIDR", which is
lesson 1.4, or "NAT", which is lesson 1.9. Keep it somewhere. When you reach
that lesson, reread what you wrote today and see whether the explanation would
have helped you back then.
