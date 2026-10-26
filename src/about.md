---
layout: layouts/page.njk
title: About | PyDelhi
description: PyDelhi is Delhi NCR's Python community, a volunteer-run group that has met since 2011 for free talks, workshops, sprints and conferences.
permalink: /about/
heading: Delhi's Python community, <em>since 2011.</em>
lede: PyDelhi is a volunteer collective of students, professionals, teachers and founders who share one interest, the Python programming language. We meet once a month, it's free, and everyone is welcome.
actions:
  - { label: "Join on Commudle", url: "https://www.commudle.com/communities/pydelhi", icon: "arrow-up-right" }
  - { label: "Read the Code of Conduct", url: "/coc/", class: "btn-line" }
---

{% section "Fifteen years of <em>Saturdays.</em>", "From a handful of developers in a room to conferences, sprints and a meetup almost every month." %}
{% timeline %}
{% moment "2011", "The first meetups" %}
A few Python developers in Delhi NCR start meeting up to talk about what they're building. The mailing list they started, ncr-python.in, still runs today.
{% endmoment %}
{% moment "2016", "PyDelhi Conf, and PyCon India in Delhi", "blog/pydelhi-14-05-16.jpg", "Attendees at a PyDelhi meetup in May 2016" %}
The first PyDelhi Conf. Later that year PyCon India comes to New Delhi, at JNU, with PyDelhi volunteers on the team.
{% endmoment %}
{% moment "2017", "Second time round" %}
PyDelhi Conf 2017, and PyCon India in New Delhi again. Workshops at colleges and institutes across the city.
{% endmoment %}
{% moment "2018", "Mega meetups", "blog/pydelhi-11-03-11.jpg", "Attendees at the International Women's Day mega meetup in 2018" %}
An [International Women's Day mega meetup](/blog/pydelhi-meetup-11-march-2018/), a [FOSS mega meetup at Adobe](/blog/pydelhi-meetup-04-august-2018/) with communities from across the city, and the first [blog recaps](/blog/).
{% endmoment %}
{% moment "2019", "Dev sprints and an anniversary", "blog/2019-02-02-devsprint-pydelhi.jpeg", "Participants and mentors at the PyDelhi dev sprint in February 2019" %}
An [anniversary meetup at Microsoft, Gurugram](/blog/pydelhi-meetup-12-january-2019/) with three other communities, and [dev sprints](/blog/pydelhi-devsprint-02-february-2019/) where first-timers sent their first open source pull requests.
{% endmoment %}
{% moment "2023", "PyDelhi Conf returns" %}
The conference comes back for a third edition, with talks [recorded on our YouTube channel]({{ site.youtube }}).
{% endmoment %}
{% moment "2025", "A new home on Commudle" %}
Meetups and RSVPs move to [Commudle]({{ site.commudle }}), and talk proposals are reviewed in the open on [GitHub]({{ site.talksRepo }}).
{% endmoment %}
{% moment "Now", "Still meeting", "photos/iwd-meetup.jpeg", "A full room at a PyDelhi meetup in 2026" %}
{{ events.past.length }} meetups on Commudle so far, most recently {{ events.past[0].name }}, and {{ talks.length }} talks given through GitHub. [See what's next]({{ site.commudle }}).
{% endmoment %}
{% endtimeline %}
{% endsection %}

{% section "How we run the room." %}
{% points %}
{% point "Free, always" %}
No tickets, no fees. Venues, food and chai come from [sponsors](/sponsor/), and everything else from volunteers.
{% endpoint %}
{% point "Beginners welcome" %}
Most of the room is new to Python or to speaking. Ask the question. Give the lightning talk. That's what it's for.
{% endpoint %}
{% point "Everyone is safe" %}
Our [Code of Conduct](/coc/) applies at every meetup and in every chat, and we enforce it.
{% endpoint %}
{% point "Run by volunteers" %}
Nobody is paid. People who came to one meetup now [run them](/volunteer/), and you could too.
{% endpoint %}
{% endpoints %}
{% endsection %}

{% section %}
{% panel "blue", "Run the next one with us.", "Every meetup is run by volunteers: finding venues, reviewing talks, running the room on the day and writing the recap. Most of us started by helping out once." %}
{% buttons %}
{% button "See how to volunteer", "/volunteer/" %}
{% button "Put your hand up", site.volunteerForm, "arrow-up-right", "line" %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
