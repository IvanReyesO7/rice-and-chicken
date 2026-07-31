---
layout: post
title:  "Some Thoughts on What I Learned From My Company's Cybersecurity Training"
author_name: Ivan Reyes
author_avatar: /assets/images/colaborators/rice_with_chicken.png
date:   2026-08-01 00:59:00 +0900
cover_image: /assets/images/posts/certificate.jpg
cover_image_alt: Cybersecurity training course completion certificate
cover_image_subtext: '- A fancy piece of paper that says I know a thing or two about cybersecurity.'
tags: [cybersecurity, career]
---

Hi, it's been a while since I updated my blog. I've been a bit busy with work, dad duties, and moving to a new house in a new city. Today, someone told me they had found this blog, which was a little embarrassing since it only had a single post. I guess that's as good an excuse as any to finally write another one.

This week, I completed a cybersecurity training course, and I wanted to share some of the things I learned and a few thoughts about the experience.

The course was offered by my company's cybersecurity team as a completely optional training program. It was announced on our Slack channel, and anyone who was interested (and had some understanding of web development) could join.

The content looked really interesting, but I hesitated to apply for three reasons:

1. The entire course was conducted in Japanese.
2. We had to give a presentation on the vulnerabilities we found while scanning a real company website.
3. There was a final exam to prove that we had actually understood the material.

But this was one of those challenges where you push yourself out of your comfort zone to learn something new, and I'm really glad I did. Here are a few of the things I took away from the experience.


## We Take Too Many Things For Granted.

One of the biggest things I took away from the course was how much we, as modern developers, take our frameworks for granted. Today's frameworks come with many security features enabled by default and protect us from some of the most common vulnerabilities.

For example, Rails automatically escapes HTML to help prevent XSS attacks, includes built-in CSRF protection, and provides safe APIs for interacting with databases, making SQL injection much harder when used correctly. Go also encourages secure development through its standard library: the `html/template` package automatically escapes HTML output to reduce the risk of XSS.

For instance:

```go
package main

import (
	"html/template"
	"os"
)

func main() {
	t := template.Must(template.New("").Parse(`{{.}}`))
	t.Execute(os.Stdout, "<script>alert('XSS')</script>")
}
```

Output:

```go
&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;
```

Text is automatically HTML-escaped by default, preventing user-controlled input from being interpreted as executable HTML or JavaScript.

Also, the `database/sql` package similarly promotes parameterized queries, helping developers avoid SQL injection vulnerabilities.
 
Learning about these vulnerabilities gave me a new appreciation for the problems developers had to solve before these protections became standard. It was fascinating to see not only how these attacks work, but also how years of lessons learned by the security community have shaped the frameworks we use every day.


## Updating Software Is More Important Than I Thought

This might sound obvious, but it wasn't to me. One of the biggest lessons from the training was just how important it is to keep your software up to date. Vulnerabilities are constantly being discovered, and older versions of frameworks and libraries often leave the door open to attacks that have already been fixed.

This doesn't just apply to your application code. Every dependency you rely on Ruby gems, Go modules, npm packages, and everything in between can become an entry point for attackers if it isn't maintained. It made me realize that updating dependencies isn't just about getting new features or bug fixes, it's a fundamental part of keeping an application secure. 

**Even if your own code is well written**, you're still trusting thousands of lines of code written by other people, so it's worth paying close attention to what you include in your project and making sure it's kept up to date.


## Hackers Have It Way Too Easy

Before this training, I had the impression that attackers manually searched for vulnerabilities one by one, carefully analyzing each website. The reality is much more automated.

Attackers have powerful tools that can scan and crawl entire websites, looking for known vulnerabilities, exposed endpoints, misconfigurations, and other weaknesses. A single attacker can use these tools to test thousands of targets with relatively little effort.

During the training, we learned how to use some of these tools ourselves to scan websites and replay requests with custom parameters. Tools like:

- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)

These are not some secret tools hidden away from the public. There are countless tutorials on YouTube, in almost every language, explaining how to use them.

That was one of the things that surprised me the most. Attackers don't necessarily need access to some underground knowledge or special training. A lot of the information they need is already available on the internet. With enough motivation, anyone can learn how to find vulnerabilities and potentially cause damage to businesses.

What makes this even more challenging is that many attackers take steps to hide their identity using VPNs, proxies, and other techniques, making it much harder to trace where an attack is coming from.

It was a good reminder that security is not just about fixing bugs when they are found. The people trying to break our systems are constantly improving their methods, so developers need to continuously learn and adapt as well.


## Alerts Are Important

One thing that really stood out to me during the training was the importance of having good monitoring and alerting in place. Even if you do everything you can to prevent vulnerabilities, it's impossible to guarantee that an application will never be attacked. Having infrastructure that can detect unusual activity, suspicious requests, or unexpected behavior can make a huge difference.

There is something especially scary about imagining a vulnerability being exploited silently for a long period of time without anyone noticing. A good security system is not only about preventing attacks, but also about quickly detecting and responding to them when they happen.


## The AI Era

One thing that the head of the security team, W-san, mentioned before handing us our certificates really stuck with me. He said that in this new AI era, even the smallest backdoor or vulnerability could be fully exploited by malicious actors using AI-assisted tools. Because of this, developers need to keep learning and adapting, including learning how to use AI effectively, not only to improve productivity but also to help build more secure software.

Another thing to keep in mind is that AI-generated code is not automatically secure. AI assistants are very good at following instructions and generating code that solves the problem described in a prompt, but they may lack the full context of the application, its architecture, or its security requirements. As a result, they can sometimes produce code that works as expected while overlooking important security considerations, including some basic best practices.

In the AI era, developers still need to understand the fundamentals. AI can be a powerful tool to help us write better software, but the responsibility of reviewing, understanding, and securing that software remains with us.


## How This Changed My Development

After completing this training, I don't think I will suddenly become a security expert, but I do think my mindset has changed.

When implementing a feature now, I want to spend more time thinking about questions like:

- Could user input reach somewhere unexpected?
- Am I trusting data that should be validated?
- Are my dependencies maintained?
- Are there security implications in this design choice?

Security is not a separate phase that happens after development. It is something that should be considered from the beginning.