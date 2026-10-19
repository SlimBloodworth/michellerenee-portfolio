# Michelle Renee Bloodworth Portfolio

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Welcome to my portfolio.

It is a multi-page, responsive site built with semantic HTML5, plain CSS and vanilla JavaScript, with no frameworks or libraries, and hosted on GitHub Pages at a custom domain. It has a home/about page with certifications and client testimonials, a My Work page with selected projects, and a contact form. A Workshops/Events page is built and set aside until I start hosting events again.

It is a work in progress, and I keep improving it as I learn.

### The challenge

The brief: a fast, accessible portfolio that works in light and dark mode and on any screen size, without leaning on a framework. These are some of the problems I ran into and solved along the way:

- **Theme without a flash.** The light/dark/system toggle saves your choice to `localStorage`, but the theme was applied by a script at the bottom of the page, so visitors could see the wrong colors for a moment. A small inline script in `<head>` now sets the theme before the first paint.
- **A screen jump on "Read more".** Collapsing a long testimonial made the page shorter, and with site-wide smooth scrolling the screen visibly jumped twice. Scrolling the card back into view instantly fixed it.
- **A swipeable carousel with no JavaScript.** Certificates and testimonials turn into a swipe row on phones using CSS scroll-snap. One shared `.swipe-grid` class does it, instead of two copies of the same code.
- **An accessible media viewer.** The certificate image and the demo video open in the native `<dialog>` element, so the dimmed backdrop, focus trapping and closing with Esc come from the browser. The video stops and releases its file however the dialog is closed.
- **Heavy media.** A 9.7 MB screen recording was trimmed, cropped and compressed to a 13-second clip under 120 KB that only loads when someone clicks play.
- **Reusable components.** Certificate styles were first named for certificates only. Renaming them to shared `media-*` classes let the project demos reuse the same thumbnail and dialog with no new CSS.

### Links

- [michellerenee.dev](https://michellerenee.dev)
- [Live design system](https://michellerenee.dev/design-system.html) - Interactive version with the light/dark toggle and working component demos
- [Design system notes](./design-system.md) - Tokens, components and code

## My process

- I decided to use GitHub Pages to host my portfolio site. I love open source, I really like GitHub, and I felt that this platform would be a good way to show my understanding of .git and using a repo such as GitHub. I decided to use the BASH terminal for this project to push, pull, branch, etc.
- I decided NOT to use Bootstrap for this project. I want to show my skills in understanding and building responsive web applications.
- I set up the repo and configured the custom domain for GitHub Pages, and verified the custom domain in GitHub Pages for added security.
- Every change gets its own Git branch and is merged through a pull request, more than ten so far, with a clear commit message and a short description each time. It is the same workflow a team would use, and it makes any change easy to review or undo.
- I wrote a design system, `design-system.md` plus a live demo page, covering the color tokens, typography, components and an accessibility checklist, and I update it whenever I add a component.
- I decided to go with a contact form instead of just a contact button, to show my understanding of forms and form validation. It currently validates the fields and opens an email draft, and I am building an n8n automation to capture leads from it.
- The content is real: my certifications, client testimonials used with permission, and two concept projects built for a junior software engineer application, one with a short demo video.

### Built with

- Semantic HTML5 markup
- Plain CSS: custom properties as design tokens, Flexbox, Grid, scroll-snap, `:has()`
- Vanilla JavaScript, with no frameworks or libraries
- Native `<dialog>` element for the image and video viewers
- Mobile-first, responsive workflow
- Light, dark and system theme toggle (`data-theme` on `<html>`, saved to `localStorage`)
- A custom "Golden Twilight" color palette, with Satoshi and Inter fonts
- Accessibility practices: skip link, visible focus rings, `aria-expanded` and `aria-controls`, descriptive alt text, reduced-motion support
- Git, GitHub (branches and pull requests) and Git BASH
- GitHub Pages with a custom domain
- [VSCode](https://code.visualstudio.com/) with Live Server - Editor
- Claude (Anthropic) as a coding and learning assistant

### What I learned

- How to set up the DNS to point to GitHub Pages to host this site. This was a bit of a hassle and I ran into several issues, so it was a lot of informative research in troubleshooting.
- Native elements such as `<dialog>`, `<button>` and `<figure>` give accessible behavior for free, so I write less code and break less.
- Layout changes and scrolling affect each other, such as the page jump when a card collapses, so a fix has to account for both.
- Small commits on a branch make mistakes cheap, because any step can be undone without touching the live site.
- Reusing and renaming components keeps the CSS small, and one-off styles are the first thing to drift.

### Continued development

- Being a portfolio, this site will change as my skills and needs dictate.
- I will keep adding new projects to the Selected Projects on the My Work page, including a contact-form and lead-capture automation built with n8n, and eventually this portfolio itself as a case study in front-end fundamentals.
- I will keep building new features as I learn and grow.
- I will keep using AI tools like Claude as a coding assistant, to work more efficiently with code review, debugging and exploring options, while making sure I understand every piece of code that goes into the site.

### Useful resources

- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) - Documentation on configuring a custom domain for GitHub Pages site.
- [Verifying a custom domain in GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) - Documentation on verifying a custom domain in GitHub Pages
- [freeconvert.com](https://www.freeconvert.com/png-to-ico) - To convert .png into .ico for favicon.

## Author

- Website - [michellerenee.dev](https://michellerenee.dev)
- CodePen - [@slimbloodworth](https://codepen.io/slimbloodworth)
- LinkedIn - [Michelle Renee Bloodworth](https://www.linkedin.com/in/michelle-renee-bloodworth-99b455187/)
- GitHub - [@slimbloodworth](https://github.com/SlimBloodworth)

## Acknowledgments

Thanks to GitHub for allowing a space for developers to network, learn, and show their progress.