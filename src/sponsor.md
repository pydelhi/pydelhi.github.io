---
layout: layouts/page.njk
title: Sponsor PyDelhi
description: Host a PyDelhi meetup, feed the room or fund recordings and speaker travel. Every PyDelhi meetup is free for attendees because of sponsors.
permalink: /sponsor/
heading: Help a room full of developers <em>show up.</em>
lede: Every PyDelhi meetup is free for attendees. Venues, food and funding from sponsors make that possible, and put you in front of the people who use your tools every day.
actions:
  - { label: "Get in touch", url: "https://github.com/orgs/pydelhi/discussions", icon: "arrow-up-right" }
  - { label: "See past events", url: "/events/", class: "btn-line" }
---

{% section %}
{% include "stats.njk" %}
{% endsection %}

{% section "Who you'll <em>meet.</em>", "A mix you rarely get in one room: students, hobbyists, and engineers who ship Python for a living." %}
{% tiles %}
{% tile "code", "Working developers" %}
Backend, data, ML, DevOps and platform engineers from startups and large companies across Delhi NCR.
{% endtile %}
{% tile "student", "Students" %}
Undergraduates and new graduates looking for their first internship or job, many of them first-time speakers.
{% endtile %}
{% tile "users-three", "Other communities" %}
Organisers from PyData Delhi, Django India, Grafana and Friends and more, who often co-host with us.
{% endtile %}
{% endtiles %}
{% endsection %}

{% set partnerTitle = "Two ways to back PyDelhi." %}
{% include "partner.njk" %}

{% section "What sponsors <em>get.</em>" %}
{% tiles 2 %}
{% tile "megaphone", "A shoutout on stage" %}
We thank you at the start and end of the meetup, and you're welcome to say a few words about your team.
{% endtile %}
{% tile "image", "Your logo, where it counts" %}
On the event page, the slides, our recap posts and the [sponsors marquee](#past-sponsors) on this site.
{% endtile %}
{% tile "briefcase", "Hiring and pitching" %}
Most meetups end with a [hiring and pitching session](/blog/pydelhi-hiring-pitching-sessions/), where you can talk about the roles you're hiring for.
{% endtile %}
{% tile "presentation-chart", "A real conversation" %}
Your engineers can [propose a talk]({{ site.proposeTalk }}) like anyone else. Proposals go through the same open review.
{% endtile %}
{% endtiles %}
{% endsection %}

{% section "Hosting a <em>meetup?</em>", "", "venue" %}
{% panel "green", "", "" %}
{# TODO confirm: venue needs are inferred from past meetups, check with the organisers #}
{% tiles 2 %}
{% tile "armchair", "Seats for 80 to 150" %}
A room where everyone can see the screen, ideally with a few tables for workshops.
{% endtile %}
{% tile "projector-screen", "Projector, mic and Wi-Fi" %}
An HDMI projector or screen, a microphone for larger rooms, and Wi-Fi that can handle a full room.
{% endtile %}
{% tile "calendar-dots", "A Saturday afternoon" %}
Meetups usually start around noon and run for three to four hours, on the third Saturday of the month.
{% endtile %}
{% tile "door-open", "Easy to get to" %}
Close to the Metro helps, and so does a clear way in for visitors on a weekend.
{% endtile %}
{% endtiles %}
{% endpanel %}
{% endsection %}

{% section "In good <em>company.</em>", "", "past-sponsors" %}
{% include "logos.njk" %}
{% buttons %}
{% button "Talk to us about sponsoring", site.discussions %}
{% endbuttons %}
{% endsection %}
