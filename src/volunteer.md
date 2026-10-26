---
layout: layouts/page.njk
title: Volunteer | PyDelhi
description: PyDelhi is run entirely by volunteers. See who does what on a meetup Saturday, meet the teams, and find out how to help.
permalink: /volunteer/
heading: Help us run <em>the room.</em>
lede: Every PyDelhi meetup is put together by volunteers, most of whom came to one as an attendee first. Pick what you're good at, or tell us something new.
actions:
  - { label: "Volunteer with us", url: "https://github.com/pydelhi/talks/issues/new?title=Interested%20in%20volunteering", icon: "arrow-up-right" }
join: true
---

{% section "A meetup, <em>backstage.</em>", "Who does what, from the week before to the week after. Every lane is a way to help." %}
{% include "run-of-show.njk" %}
{% endsection %}

{% section "How to <em>start.</em>" %}
{% steps %}
{% step "Say hello" %}
[Open an issue]({{ site.volunteerForm }}) saying what you'd like to help with, or tell any volunteer at a meetup.
{% endstep %}
{% step "Join the group" %}
We'll add you to the volunteers' chat, where meetups get planned.
{% endstep %}
{% step "Shadow a meetup" %}
Help out on the day alongside someone who has done it before.
{% endstep %}
{% step "Own a lane" %}
Take on one lane of the next meetup, from the poster to the venue to the recap.
{% endstep %}
{% endsteps %}
{% endsection %}

{% section "The <em>crew.</em>", "Our volunteer teams, as listed on GitHub. Volunteered with us and not here? Add yourself." %}
{% include "volunteer-teams.njk" %}
{% buttons %}
{% button "Add yourself on GitHub", "https://github.com/pydelhi/volunteers", "github-logo", "line" %}
{% endbuttons %}
{% endsection %}
