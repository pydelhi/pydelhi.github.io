---
layout: layouts/page.njk
title: Sponsor PyDelhi
description: Host a PyDelhi meetup, feed the room or fund venues, recording gear and the meetups to come. Every PyDelhi meetup is free for attendees because of sponsors.
permalink: /sponsor/
heading: Help a room full of developers <em>show up.</em>
lede: Every PyDelhi meetup is free for attendees. Venues, food and funding from sponsors make that possible, and you meet the developers who use your tools.
actions:
  - { label: "Talk to us", url: "https://github.com/orgs/pydelhi/discussions", icon: "arrow-up-right" }
  - { label: "Sponsor on GitHub", url: "https://github.com/sponsors/pydelhi", icon: "github-logo", class: "btn-line" }
---

{% section "One Saturday, <em>three ways in.</em>", "Host the room, feed it, or fund what happens in it. Most sponsors pick one; some do all three." %}
{% include "sponsor-doors.njk" %}
{% endsection %}

{% section "Your logo, on the thank-you slide.", "Every meetup opens and closes on this slide, in front of the whole room." %}
{% include "sponsor-slide.njk" %}
{% endsection %}

{% section "Who's in the room." %}
{% points %}
{% point "Working developers" %}
Backend, data, ML, DevOps and platform engineers from startups and large companies across Delhi NCR.
{% endpoint %}
{% point "Students" %}
Undergraduates and new graduates looking for their first internship or job, many of them first-time speakers.
{% endpoint %}
{% point "Organisers" %}
People who run PyData Delhi, Django India, Grafana and Friends and other communities, and often co-host with us.
{% endpoint %}
{% point "Hosts like you" %}
More than {{ site.sponsorCount }} companies and venues have hosted or fed a PyDelhi meetup since 2011.
{% endpoint %}
{% endpoints %}
{% endsection %}

{% section "What sponsors get.", "Whichever way you come in, this is what comes back." %}
{% include "sponsor-perks.njk" %}
{% endsection %}
