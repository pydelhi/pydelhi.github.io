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
join: true
---

{% section %}
{% include "stats.njk" %}
{% endsection %}

{% section "What we <em>do.</em>", "Meetups are the heart of it, but there's a lot more going on between them." %}
{% tiles %}
{% tile "calendar-dots", "Monthly meetups" %}
Talks, lightning talks and Birds of a Feather circles, usually on the third Saturday of the month, hosted by a different company or campus each time.
{% endtile %}
{% tile "laptop", "Workshops" %}
Laptops open, code along, leave with something working. We also run workshops at colleges and institutes across Delhi NCR.
{% endtile %}
{% tile "microphone-stage", "Conferences" %}
PyDelhi Conf, our own local conference, ran in 2016, 2017 and 2023, and PyDelhi volunteers helped bring PyCon India to New Delhi in 2016 and 2017.
{% endtile %}
{% tile "git-pull-request", "Dev sprints" %}
Afternoons spent contributing to open source together, from Python libraries to Debian packaging, with people who've done it before.
{% endtile %}
{% tile "briefcase", "Hiring and pitching" %}
Near the end of most meetups, anyone can pitch themselves for a job or internship, or pitch a role their team is hiring for. [How it works](/blog/pydelhi-hiring-pitching-sessions/).
{% endtile %}
{% tile "handshake", "Collaborations" %}
Joint meetups with PyData Delhi, Django India, Grafana and Friends, ILUG-D and others. Python is better with company.
{% endtile %}
{% endtiles %}
{% endsection %}

{% section "Fifteen years of <em>Saturdays.</em>" %}
{% timeline %}
{% moment "2011", "The first meetups" %}
A handful of Python developers in Delhi NCR start meeting up to talk about what they're building. The mailing list, ncr-python.in, is still running today.
{% endmoment %}
{% moment "2016", "PyDelhi Conf and PyCon India" %}
The first PyDelhi Conf, and PyCon India comes to New Delhi, at JNU, with PyDelhi volunteers on the team.
{% endmoment %}
{% moment "2017", "Second time round" %}
PyDelhi Conf 2017, and PyCon India in New Delhi again.
{% endmoment %}
{% moment "2018", "Mega meetups" %}
An International Women's Day mega meetup and a FOSS mega meetup at Adobe, Noida, with communities from across the city, plus dev sprints and our first blog recaps.
{% endmoment %}
{% moment "2023", "PyDelhi Conf returns" %}
The conference comes back for a third edition, with talks [recorded on our YouTube channel]({{ site.youtube }}).
{% endmoment %}
{% moment "2025", "A new home on Commudle" %}
Events and RSVPs move to [Commudle]({{ site.commudle }}). Talk proposals are reviewed in the open on [GitHub]({{ site.talksRepo }}), where {{ talks.length }} talks have been delivered and counting.
{% endmoment %}
{% endtimeline %}
{% endsection %}

{% section "How we run the <em>room.</em>" %}
{% tiles 2 %}
{% tile "currency-inr", "Free, always" %}
No tickets, no fees. Venues, food and chai come from [sponsors](/sponsor/), and everything else from volunteers.
{% endtile %}
{% tile "plant", "Beginners welcome" %}
Most of the room is new to Python or to speaking. Ask the question. Give the lightning talk. That's what it's for.
{% endtile %}
{% tile "hand-heart", "Everyone is safe here" %}
Our [Code of Conduct](/coc/) applies at every meetup and in every chat, and we enforce it.
{% endtile %}
{% tile "users-three", "Run by volunteers" %}
Nobody is paid. People who came to a meetup once now [run them](/volunteers/), and you could too.
{% endtile %}
{% endtiles %}
{% endsection %}
