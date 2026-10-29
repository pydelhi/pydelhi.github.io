---
layout: layouts/page.njk
title: Volunteer | PyDelhi
description: PyDelhi is run entirely by volunteers. Meet the core team and the volunteer teams, and find out how to help.
permalink: /volunteer/
heading: Help us run <em>the room.</em>
lede: Every PyDelhi meetup is put together by volunteers, most of whom came to one as an attendee first. Pick what you're good at, or tell us something new.
eleventyComputed:
  actions:
    - { label: "Volunteer with us", url: "{{ site.volunteerForm }}", icon: "arrow-up-right" }
---

{% section "Where you <em>fit in.</em>", "Pick one, or a few. Every card opens the same short Google Form so we can say hello." %}
{% include "volunteer-roles.njk" %}
{% endsection %}

{% section "How to start" %}
{% steps %}
{% step "Say hello" %}
[Fill the volunteer form]({{ site.volunteerForm }}), [message any admin on WhatsApp]({{ site.whatsapp }}), or tell any volunteer at a meetup what you'd like to help with.
{% endstep %}
{% step "Join the group" %}
We'll add you to the volunteers' chat, where meetups get planned.
{% endstep %}
{% step "Shadow a meetup" %}
Help out on the day alongside someone who has done it before.
{% endstep %}
{% step "Pick a team" %}
Take on one part of the next meetup, from the poster to the venue to the recap.
{% endstep %}
{% endsteps %}
{% endsection %}

{% section "Core team", "The people who organise every meetup, from planning to the day itself." %}
{% include "core-team.njk" %}
{% endsection %}

{% section "Volunteers by team", "Everyone who helps, core team included, team by team." %}
{% include "volunteer-teams.njk" %}
{% endsection %}

{% section "With thanks." %}
{% include "past-volunteers.njk" %}
{% endsection %}

{% section %}
{% panel "blue", "Got a Saturday to spare?", "Fill the volunteer form and we'll get in touch before the next meetup. Not sure yet? Ask us anything on WhatsApp first." %}
{% buttons %}
{% button "Fill the volunteer form", site.volunteerForm, "arrow-up-right" %}
{% button "Ask on WhatsApp", site.whatsapp, "whatsapp-logo", "line" %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
