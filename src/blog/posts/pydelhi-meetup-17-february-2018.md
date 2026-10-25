---
title: "PyDelhi Meetup – 17th February, 2018"
date: 2018-02-17
author: "Anubhav Bhambri"
summary: "PyDelhi members coming together and meeting up to learn, collaborate, give encouragement and seek advice from members who are such excellent source of support.:)"
cover: blog/pydelhi-17-02-2018.jpg
oldUrl: /blog/pydelhi-meetup-17-February-2018.html
---

Okay! So, let me start with a question to you all. Do you think that you know python? 

If you have been working with python for some time, then your answer to the question would probably be yes. Just like many of those who were asked “what would be the output of this:”

```
  def append_to(element, to=[]):
       to.append(element)
       return to

  my_list = append_to(12)
  print my_list
  my_other_list = append_to(42)
  print my_other_list
```
[Gaurav](https://twitter.com/Root3d) gave a talk at the PyDelhi meetup on 17th of February, 2018. The above question is from one of the slides that he showed to everybody at the meetup. He also revealed the right answer, of course. But before I tell you what it is, let me tell you how it all started.

{% photo "blog/pydelhi-17-02-2018.jpg", "Attendees at the PyDelhi meetup at Fueled", "(max-width: 760px) 100vw, 720px", { loading: "lazy" } %}

The PyDelhi meetup was held at [Fueled](https://twitter.com/Fueled) and it started at 12 in the noon. It began with everybody giving a brief introduction about their selves. And the introduction session made it clear that people there, were from very diverse backgrounds. Yet they all had one common reason to come together – python.

After introduction session completed, the talk by [Gaurav](https://twitter.com/Root3d) on “Gotchas in python” was next. As you must have guessed, the talk was about sharing some insights of python language. But instead of simply sharing them with everyone, the speaker decided to do it the hard way (hard for us, not him). Everybody was shown some code in python and asked this question “what would be the output of this,” the same way you’ve been asked. So that everybody can test their python skills before speaker reveals the right answer.

If you have tested your python skills with the above question sincerely, then you must be thinking – ‘did the speaker at the meetup also made you wait so long for the right answer.’ So, before you start thinking that loudly, I should share the right answer with you:

```
 [12]
 [12, 42]
```
A new list gets created once when the function is defined, and the same list is used in each successive call. But here’s what you might have expected to be the output:

```
 [12]
 [42]
```
If you got the answer right on your own, that’s great. If not, that’s even better, because it means that I’m not alone here. However, if you are thinking how this can be the output, let’s make it clear for you:

Python’s default arguments are evaluated once when the function is defined, not each time the function is called (like it is in say, Ruby). This means that if you use a mutable default argument and mutate it, you have mutated that object for all future calls to the function as well. 

The next session lined up after Gotchas was “Lightening Session.” In lightening session, anybody from the audience can come on the stage and give a talk in a bolt of five minutes about any topic he or she likes. If five minutes seems too short to you, I tell you what, it’s not. At PyDelhi, a lot can happen over a bolt of five minutes.

Downloading language specific software packages, machine learning, contributing to open source projects were some of the topics that people talked about in this meetup. All these talks were short, precise and to the point. PyDelhi appreciates the willingness of all these participants. 

Near the end was pitching session. Anybody who’s looking for a job, want to hire someone, want a mentor, want to work on a project, etc. etc. can just simply come on the stage and let everybody know about it. If there’s somebody who’s interested in any participants pitch, can contact him or her directly.

Pitching was the last session of the meetup. Thus, after the pitching session and with some positive feedback from the participants, one more PyDelhi meetup got concluded successfully. With the conclusion of one, a preparation for the next meetup has already started, and I hope to see you all there. Till then!.....hey! wait wait wait!!! Let me end it where we just started – do you think you know python? Let’s find out:

```
 def create_multipliers():
     return [lambda x : i * x for i in range(5)]

 for multiplier in create_multipliers():
     print multiplier(2)
```
