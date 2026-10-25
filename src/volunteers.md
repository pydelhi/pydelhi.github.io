---
layout: layouts/page.njk
title: Volunteers | PyDelhi
description: PyDelhi is run entirely by volunteers. Meet the teams, and find out how to help with design, social media, talk reviews, venues and more.
permalink: /volunteers/
heading: Help us run <em>the room.</em>
lede: Every PyDelhi meetup is put together by volunteers, most of whom came to one as an attendee first. Pick what you're good at, or tell us something new.
actions:
  - { label: "Volunteer with us", url: "https://github.com/pydelhi/talks/issues/new?title=Interested%20in%20volunteering", icon: "arrow-up-right" }
join: true
---

{% section "Ways to <em>help.</em>" %}
{% tiles %}
{% tile "palette", "Graphic design" %}
Posters for each meetup, slides for the opening talk, and social graphics.
{% endtile %}
{% tile "browser", "Web design" %}
This website, Commudle pages, and anything else people see online.
{% endtile %}
{% tile "instagram-logo", "Social media" %}
Announce meetups, post live from the room, and share the recap afterwards.
{% endtile %}
{% tile "pencil-simple", "Content writing" %}
Write [blog recaps](/blog/), event descriptions and the emails that go out to the community.
{% endtile %}
{% tile "check-square-offset", "CFP review" %}
Read [talk proposals]({{ site.talksRepo }}/issues) on GitHub and help speakers sharpen them, following our [reviewer guidelines]({{ site.reviewingGuidelines }}).
{% endtile %}
{% tile "briefcase", "Marketing and sponsors" %}
Reach out to companies about hosting a meetup or sponsoring food, and look after them on the day.
{% endtile %}
{% tile "clipboard-text", "On the ground" %}
Registrations at the door, seating, mics, timekeeping and keeping the chai flowing.
{% endtile %}
{% tile "video-camera", "Recording" %}
Record talks and get them onto our [YouTube channel]({{ site.youtube }}).
{% endtile %}
{% tile "dots-three", "Something else" %}
Got a skill that isn't on this list? Tell us, and we'll find a way to use it.
{% endtile %}
{% endtiles %}
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
{% step "Own a piece" %}
Take on a part of the next meetup, from the poster to the venue to the recap.
{% endstep %}
{% endsteps %}
{% endsection %}

{% section "The people behind <em>PyDelhi.</em>", "Our volunteer teams, as listed on GitHub. Volunteered with us and not here? Add yourself." %}
{% include "volunteer-teams.njk" %}
{% buttons %}
{% button "Add yourself on GitHub", "https://github.com/pydelhi/volunteers", "github-logo", "line" %}
{% endbuttons %}
{% endsection %}
