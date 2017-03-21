# The Mobile-First Controversy Card Prototype

A GIS-inspired approach to visualizing discourse on scientific controversies, built in React.js for mobile devices.

## What is This Thing?

The <a href="https://plus.google.com/collection/Yhn4Y">Controversies of Science G+ collection</a> is intended as a social network which aims to teach critical thinking in the sciences by immersing non-specialists into a number of complex scientific debates involving opposing worldviews.

It will double as a systematic effort to crowdsource information about scientific controversies, introducing a new form of science journalism intended to better help people to use science as a tool for thinking.

A more detailed explanation of the problem this project is solving is explained after the prototype description.

## The Prototype Graphic

The static graphic that I've chosen to convert into an interactive, deep-zoomable infographic ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/halton-arp-the-modern-galileo-bbal-card-7percent-rez.jpg" />
</p>

## The State of the Prototype

See live mobile-friendly demo at https://worldviewer.github.io/react-worldviewer-prototype/.

This project has been recently transitioned from Apigee / Usergrid to MongoDB / AWS Lambda / AWS S3.

### Part 1: The Infographic Frontend

A common element for all of the enhanced controversy cards will be a deep-zoomable background which on zoom will eventually act as an interactive wall for discussion of the topic.

#### The OpenSeadragon / DZI Deep Zoom Image Pyramid Background

Clicking or pinching the background will zoom into it.

The decision to use the OpenSeadragon/DZI deep zoom approach followed from the iPhone's viewport maximum-scale limitation of 10x zoom.  A prototype was constructed to test whether or not this would be sufficient to observe the smallest type within the existing graphics, and it was definitively observed to be a problem.  Since this 10x limit is non-negotiable, an alternative solution which could get us to far deeper zooms and far larger canvases was necessary.

MagickSlicer was used to generate a DZI image pyramid for the large background jpeg (similar to how GIS mapping software works).  In short, these tools solve the problem -- even for mobile devices -- by breaking the graphic up into a grid.  This permits the loading of select tiles rather than the entire image.

That image pyramid is now successfully serving through React.js on both mobile and desktop devices.

OpenSeadragon supports a variety of tile sources.  It can work even with plain JPG images, but what I found through experimentation (and confirmed in the documentation) is that this is only true for desktop; zooming into a JPG image does not work on a mobile device.  The image will simply refuse to load.  Once the DZI pyramid image was created with MagickSlicer, the problem was resolved.

#### Things Devs Should Know About OpenSeadragon

- The path to the pyramid files must include a trailing slash (or the console will fill with tile errors).
- The OpenSeadragon container must be specified in specific pixel amounts (or nothing will display).
- Getting React.js to play with OpenSeadragon is no minor matter, as they are constructed on two very different notions: OpenSeadragon assumes that access to the DOM is readily available, whereas React of course begs to differ.  I'll over time be checking in with other React developers to get feedback on the current approach.
- MagickSlicer generates a .dzi file and a directory.  The directory needs to be publicly accessible so that OpenSeadragon can reference the image pyramid by URL.  This is of course quite different from how most images are served.
- I found that the easiest way to get the pyramid image data from the .dzi file into OpenSeadragon was to simply pass the XML directly into OpenSeadragon as parameters.  Once you do that, you can ditch the original .dzi file.  Looking at other online projects was very helpful for figuring this out.

#### The Foreground Overlay Assets

The interface will soon be refactored to be more slideshow-like.  Currently, the bubbles respond to clicks/taps by zooming.

Since the 9 foreground information bubbles are overlays, they require transparent backgrounds -- and therefore cannot be JPG's.  The PNGs were processed by TinyPNG.com, reducing their total PNG filesizes by 60%.  This was more than just a measure to reduce the total asset size; at the uncompressed PNG sizes, mobile browsers would commonly crash during load.

#### GSAP Animations via ReactTransitionGroup

I've brought in ReactTransitionGroup and GSAP ("the Swiss Army knife of animation") in order to get a more fine-grained control over animations at both load and component mount/unmount.  The explanation for the refactor is based upon the solution <a href="https://medium.com/@cheapsteak/animations-with-reacttransitiongroup-4972ad7da286#.8lzv3vt8z">here</a>.  There are three things to know about the ReactTransitionGroup approach:
    (1) You must call the supplied callbacks that are supplied to the new lifecycle methods -- componentWillAppear, componentWillEnter, componentDidEnter, componentWillLeave and componentDidLeave -- after your animation ends, otherwise your component will enter but not leave (or leave but not enter).  I can validate that this is indeed the case.
    (2) Because ReactTransitionGroup relies upon the new lifecycle methods which it introduces to exist, in order for these animations to link to those particular hooks, it's necessary to move the SomeComponents we want to animate into their own AnimatedSomeComponents.
    (3) In the parent of AnimatedSomeComponent, SomeComponent, we must generate a ref attribute with `ref={c => this.container = c}` so that we can refer to the parent with `const el = this.container` inside of the child.

### Part 2 - The Usergrid Backend that Wasn't Meant to Be

A more detailed explanation of this first attempt at setting up a backend is here:

https://github.com/worldviewer/react-worldviewer-prototype-usergrid

My initial experiences with Usergrid were sub-optimal.  The command-line syntax is unintuitive.  It's difficult to attach more than one file to a Usergrid entity.  And I made it all the way to a functional backend before it became apparent that there is an issue with retrieving images from a Usergrid backend to a mobile device.

### Part 3 - The Shiny New Serverless AWS Lambda / S3 CDN / mLab MongoDB Backend

The new backend is currently built out with two AWS Lambda Node.js microservice deployments for the pair of API endpoints which fetch data from a mongoDB database hosted on mLab.

An AWS S3 CDN bucket delivers static assets for the deep zoom image pyramid and the graphic overlays.

Those microservices repos are here:

https://github.com/worldviewer/aws-lambda-mongo-cards-api
https://github.com/worldviewer/aws-lambda-mongo-metacards-api

Typical controversy card JSON:

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/controversy-card-json.png" />
</p>

### Part 4 - The Controversies of Science Scrape Script

While the social network is building out, new controversy cards will continue to post to the G+ collection.  A scraper script has been constructed to rapidly populate the mongo database.  That is here:

https://github.com/worldviewer/controversy-api-mongodb

## The Next Steps

- Refactor into Redux
- Set up React Router
- Set up Slides from JSON to control Bubble zoom state machine
- Add the Controversies of Science logo to splash screen
- Add markdown modal to Bubble clicks (deliver portions of text at a time)
- Record audio of the text
- Add audio support to slideshow (audio timestamps should control slideshow)
- Add additional UI layers for concept, propositional and model levels (switch between them using vertical swiping)
- Wrap megaboilerplate with auth around prototype
- What I am ultimately working towards with this prototype is something similar to https://github.com/Emigre/openseadragon-annotations.  I want to be able to annotate the image pyramid and persist those annotations (although my annotations will not be hand-drawn drawings -- but rather more like interactive GIS icons with text labels, and other more structured annotation elements).  Based on advice from Rishat from codementor.io, I should keep track of the absolute canvas-based coordinates at all times in my React state, and use that zoom level and calculated box to determine whether or not to render any particular annotation overlay.  With this approach in mind, it may not be necessary to refer to the implementation above (?).
- Mix in Steam social network feed API

# The Backstory

The rest of this document goes into the theory, history and experiences which led to this idea.

## Defining the Problem of Visualizing Scientific Controversies

There have been many historical attempts at visualizing debate -- none of which having gained much in the way of widespread traction.  In fact, it might be fair to call the documentation of argumentation visualization in ...

<p align="center">
  <a href="https://www.amazon.com/Visualizing-Argumentation-Collaborative-Educational-Sense-Making/dp/1852336641/ref=sr_1_1?ie=UTF8&qid=1484428766&sr=8-1&keywords=visualization+of+argumentation">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/visualizing-argumentation.png" />
  </a>
</p>

... a sort of newspaper obituary for argumentation visualization where the accomplishments of people you've never met are listed out.

It seems that many people have been struck with the -- arguably obvious -- realization that we need to have a way to bring a sense of order to this area.  But, there remain, to my eye, deep misunderstandings about what problems truly need to be solved in this area.

### Example 1

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/ai-controversy-map.jpg" />
</p>

### Example 2

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/arguman-zoomed-out.jpg" />
</p>

### Example 3

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/old-school-argumentation-mapping.png" />
</p>

What each of these examples should show with just a quick glance is that the simple 2d structure is not adequately conveying the complexity of the situation.

But, further, the elements in these diagrams do not convey a sense of: I want to learn with this!

It's tedious.

And it fails to convey the fact that communication is always occurring on several simultaneous levels.  We need a "third dimension" to do that.

## Prototype Description

### Objectives:

- Make scientific controversies entertaining.
- People who use the app will tacitly learn what a worldview is.
- Create an infographic viewer which is designed from inception to work on a mobile screen, and which can accommodate the "controversy card" design pattern.
- For the purpose of this prototype, I will pick a single example graphic which demonstrates the form of entertainment and learning I am seeking (this will be the <a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/DCDKHXnrdoH">Halton Arp controversy card</a>).
- (!MVP) I won't focus at this point on navigating between different controversy cards (I have almost 200 of them), so all of the data for now will be mocked; the point of this prototype is to experiment with interactions using React components.

### Responsive and Interactive

- The app should be responsive and fully take advantage of mobile gestures
- Rather than use the G+ graphic as it was uploaded, the graphic should be broken up into its four main parts: the title, the summary, the graphic and the circled annotation icon.  The point of this is to expand the options for interaction and animation.  If necessary, graphics resolution can be enlarged.
- Each element should respond in its own appropriate way to interactions.
- Since the goal is to make controversies entertaining, I hope to over time experiment with various animations -- and regularly check in with designers for feedback.

### Swipes

- Vertical swipes should teach the epistemological structure of science, in that the levels of thought are differentiated by vertical swipes (clash of worldview at the top, model-level layer one down from there, propositional one down from that, and at the very bottom, concepts).  This realization stems from more than a decade of online interactions on controversial science topics.
- Since the graphics used have been designed for zooming, horizontal swipes should transition through any "slides" which exist within it (which for the time being will be defined by a local, static JSON list).
- The controversy card exists at the top worldview layer.
- Swiping the app upwards should bring up a feed of the best related resources (the model layer).  This would be a mix of resources -- annotated articles, excerpts from books, excerpts from threaded discussions, social media posts, anything that is related to the debate which characterizes the mainstream perspective on the subject.  Any bolding or highlighting within these resources would need to be pertinent to this particular controversy (and these would likely rely upon some pre-existing annotation service or tool).  Each of these sources are characterized (like crank dot net) by one of a set of labels: "metaphysics", "mainstream", "scientism", "alarmist", etc.  This should probably be a reddit-like rankable list.
- Another swipe up should bring up a list of propositions (questions, conjectures, claims) -- which in turn act as collections of resources to support those propositions.  The ranking standards here are quite different from the model layer; we are talking here more about getting people to think.
- Another swipe up takes the user to the concept level, which includes concept maps, definitions, links to relevant wikis, etc.  This could be ranked in terms of how helpful they are to understanding the debate.
- (!MVP) At each level, new content can be added by users (but I won't be constructing a real database or API backend just yet).

### Annotations and Comments (!MVP)

- Annotations to the graphic should only appear at a minimum zoom, so that they do not interfere with the graphic itself
- Perhaps a heat map can occasionally appear to show the annotation activity (?), or be toggled
- Comments can attach to any content on any level (need to investigate best way to implement this on mobile)

### Interactions

- Clicking the circled annotation icon animates in a ranked set of related controversy icons, connected by a line, and titled, with background shaded dark or light to contrast
- The summary can be slid out of the way to the bottom of the screen to make room for observing the graphic.  And when it is, the annotation icon also slides out of the way to the nearest side.
- Clicking any circled content within the graphic zooms and centers to it; additional pinching can further zoom the content, if needed.

### TBD

- How will I display the article text?
- How will social media sharing occur?
- How will inter-card navigation occur?
- How will users be able to annotate all content?
- What css framework should I use?
- Is there a React mobile framework which starts me out with a bunch of useful components?  Or, should I assemble these together piecemeal?

## Why I Will Solve this Problem

The driving motivation here comes from my experiences running claims between against-the-mainstream theorists and their critics, and then taking those experiences and attempting to pitch laypeople.

To fully appreciate the depth of scientific controversy, a person has to take for granted -- through some provisional process of belief -- that the experts are wrong about some sort of ongoing debate.  Then, from that worldview, convince somebody else.

The refusal to go through that process creates a blind spot for people who design these systems.  The truth is that people who design argumentation systems approach the subject in a positivist manner.  Yet, positivism is plainly geared towards what Thomas Kuhn refers to as "normal" science.

When it comes to scientific controversies, the correct approach is a constructivist epistemology.

If those words don't mean anything to you, you might want to skim through these explanations ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/constructivism-bbal-cards.jpg" />
</p>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/H1akZRDWs5Y">**The Positivists vs the Constructivists**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/fTuMvbBD3Dg">**The Constructivist Revolution**</a>

The Cliff's notes is that the only way to create a system which can actually stand a chance of changing somebody's mind on a real-world issue -- which one must presume is the actual point of these diagrams -- is to actually believe that experts can sometimes be wrong -- as has historically been the case, of course.

If you don't believe that that can be happening right now, going into the situation of designing an argumentation interface, then that epistemology is predictably going to reveal itself through your design.  You might as well be working on something else.

My own approach has been to systematically document critique of modern science, because I believe that we can increase the rate of innovation within the sciences.  On rare occasion, I will add my own insights into the collection; but for the most part -- and quite intentionally -- I believe that we should not be re-writing the works of these critics, because an important part of what must be learned by laypeople is that this critique comes from a diverse set of independent thinkers.  These people are not coordinating, and yet, they frequently corroborate one anothers' works.

Before continuing on to my proposed solution, let's jump through some samples which I think will help the typical layperson to better define the problems of modern science ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/controversy-cards.jpg" />
</p>

Note that the *Controversies of Science* collection includes "controversy cards" which cover 6 separate categories ...

- *ongoing* - Recent, ongoing controversies
- *historical* - Controversies possibly still at play, but more historical in nature
- *person* - Some people you should know about + character studies
- *reform* - Relevant to academic reform and redesigning scientific discourse
- *critique* - The best critical commentary ever published for modern science
- *thinking* - How to think like a scientist about controversies

The cards shown above are a limited sampling of some of those categories.

To learn more about any of these topics, find the link below ...

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/FXj2NzSzjSo">**The Decline in Conceptual Revolutions**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/LHiQnz7caYV">**The College Experience**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/ARg3vVaoKfk">**The Narrative of Scientific Discovery**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/i6e3YHua8z1">**The Anti-Pattern of Settled Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/9zhxMNRDha3">**The Pre-Scientific Judgment of New Ideas**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/FpsEoynk6cH">**The Unlearning of Creativity**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/9UVEhtvjuAo">**The Crowdsourcing of Scientific Controversies**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HV5W3xBr1AQ">**The Force Concept Inventory Test**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/a465vDkKrSd">**The History of Peer Review**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Dxq5nJgeDGo">**The Journal Oligopoly**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/QtKVXCKte2C">**Over-Specialization**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Drcac91Aava">**The Scientific Attitude**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/YL5TQWx5U6a">**The Two Systems of the Mind**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/3uPsnDLdbKi">**The Pressure to Publish**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/1eZJwiPZMuN">**The Wisdom of Crowds**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HrBYGqWXFwY">**Innovation's Long Tail**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/U6qWs62w9Mo">**Innovation Starvation**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/DGgoWbwziq8">**The Information Cascade**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Rauu21NEors">**Tourists vs Explorers**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/UoR73bKjt4F">**Why Outsider Mavericks Matter in Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/hCWxYGv6KBU">**Why Critique Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/ZNuUvggTdrf">**The 5 Stages of the Mind**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Qd6aZV2ASvR">**The Lesson of the Cracking of Enigma**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Cp7MKcMN3dr">**The Generalist**</a>

## The Future of Scientific Controversy

From these experiences of pitching alternative worldviews online through technical arguments, I came to realize that the web is not fundamentally structured to accommodate or facilitate the "clash of worldviews". And some of these problems occur at the level of communication infrastructure. Just to give some examples ...

**(1) Text is a major problem for conveying new ideas.** Challenges to textbook theory do not fit into a tweet; yet, people just don't want to invest the time required to learn about controversies through the necessary reading unless they have a pre-existing sense that the idea is correct. Controversies are caught in the middle of this tension between the need to be terse, in order to accommodate busy people, and the need to adequately explain the complexity of a technical debate.

What I am proposing is that we can address this problem by making controversies more interactive.  The public has a role to play in the future of scientific discovery.

I'm also suggesting that the approach we've seen with _Cosmos_ and a host of other similar science entertainment is not the only way to make science entertaining; we can also build information systems which simultaneously empower the participant and visually delight them.  **We can transform scientific controversies into a new form of entertainment.**

(2) Comments are traditionally placed at the bottom of an article online, and in a linear fashion. To get to a comment about something in particular, you typically have to digest the feed. On some sites, the feed becomes uselessly long after just an hour. I don't know about you, but when I look at the comments on Huffington Post, and I see that there are 5,000 posts, there is a sense that my contribution means nothing at all. I can't be the only one who feels like that

I feel strongly that the box of comments at **the bottom of the article is built to fail. You cannot scale that box for innovative ideas; what it is good for is conveying consensus -- not controversy.**

Probably nobody ever said: *"A comment beneath an article convinced me of a new paradigm in science."*

(3) **I've been strongly impacted by what I've learned about annotations, but very cautious about the existing approaches. I feel that the history of annotations suggests that they are more important than we today recognize.** But, I also see that annotations seem to necessarily look different for each niche ... I wonder if there can actually be a general-purpose solution for annotations? (perhaps even contrary to what Hypothes.is envisions, despite my deep respect for their intentions and work).

My reaction to these and other realizations -- born of a decade of running and pitching claims online -- is to try to reconstruct the communication infrastructure ... to question everything about how it is currently done, and experiment with solutions that are a reaction to the problems I ran into trying to pitch new ideas to a skeptical public.

**What we have yet to build is an Internet communication platform which is fundamentally designed to convince somebody of something which they've never before believed.**

This is what I am building towards.

## Why GIS

GIS stands for Geographic Information System.  It's a software UI approach to mapping which stitches together layers of representation into a larger representation.  The choice of layers for a GIS map is of course carefully chosen to serve some sort of specific purpose.

An example might look like this ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/gis-layers.png" />
</p>

We'd be wise to ask, in light of the sophistication of these GIS tools today: *Can we repurpose this technology for the visualization of argumentation?*

What I'm asking is: Can we map the structure of science ... this ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/the-structure-of-science-bbal-card.jpg" />
</p>

... to the GIS software approach?

I am going to make the case here that the answer is an emphatic *yes* -- and that once it is explained, you too will understand why this is in fact the inevitable solution to the argumentation visualization graveyard problem.

I would take this even a step further that, in the light of upcoming technologies like virtual and augmented reality, this is what the future of *all* online discourse could eventually look like.

## How to Map Discourse to GIS

To take controversies out of their "flatworld" representation into a new "3-dimensional", modern representation, we start with the social media unit of information: the graphic with some sort of prominent summary.

<p align="center">
  <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/top-spot.jpg" />
</p>

I have attempted to document the pattern in my <a href="https://plus.google.com/collection/Yhn4Y">Controversies of Science</a> collection -- with a set which currently stands at almost 200 examples.  This has been fundamentally designed as a curriculum to teach the topic of scientific controversies.

What I want to propose here is that each graphic could be much like a map which will have completely different representations depending upon the scale/zoom ...

At the continent blue-marble scale of a traditional map, you see no country borders. You simply see terrain.

At the country scale, you see no roads.

At the scale of cities, you see no homes.

Mapping software has been designed to solve this problem where you need to stitch these completely different layers together.

Perhaps one reasonable approach would be to embed the epistemology of science into the zoom ...

At the level of the graphic, you don't see any annotations. You just see the original graphic. This solves the original annotation problem which Google's Page wrestled with in college -- having this problem of the annotations cluttering the webpage to the point where the original content becomes inundated (a problem which he never actually revisited once he came up with PageRank ...).

The history of the annotation technology is covered here ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/the-annotation-of-scientific-papers-bbal-card.jpg" />
</p>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/JTW1FYZbDYy">**The Annotation of Scientific Papers**</a>

Zoom one scale down from the level of graphic, and perhaps you see the clash of worldviews.

Zoom one scale below that for some particular claim, and you are in the world of models.

Say you are interested in one particular model, so you dig into it deeper -- and now you are at the level of propositions.

Yet even propositions have further structure, since they link together multiple concepts. So, drill yet one more down, and you are looking at concepts and constructs, the base layer of science.

We are really at the ground level at this point, and perhaps the visualization m.o. switches at this point from 2d to 3d (?), so that concepts can be brought to life with actual 3d modeling software (science's own version of Minecraft).

Each epistemological layer would visualize in a different manner, but also logically connect to one another like the branches of a tree.

My premise is that if such a system was to exist, scientific controversies would no longer be this boring world which academics can get away with ignoring. We'd see a revival of the topic. Controversies would become a form of entertainment, and the academic community could no longer just ignore them.﻿

If such an approach was combined with Gerald Pollack's plans for an Institute for Venture Science, we'd see modern science enter into a new era of innovation.

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/the-institute-for-venture-science-process-bbal-card.jpg" />
</p>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/GtfYqmXUYKX">**The Institute for Venture Science Peer Review Process**</a>

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/support-your-local-universe.jpg" />
</p>

I'll use this repository to build out a prototype which demonstrates what this concept would look like.  I'll build out -- possibly in React and React Native (?) -- what a GIS interface to scientific controversies might look like.