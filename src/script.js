const yellow = "#FACC48";
const pink = "#B13CC9";
const teal = "#3BC9B2";
const white = "#FFFFFF";
const navArr = [];
// nav bar
const navBar = document.getElementsByClassName("nav-bar")[0];
const myWorks = document.getElementById("my-works");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const socials = document.getElementById("socials");
// contact form
const contactForm = document.getElementsByClassName("contact")[0];
const closeWindow = document.getElementById("closeWindow");
// socials
const socialIcons = document.getElementsByClassName("socials")[0];
navArr.push(myWorks);
navArr.push(about);
navArr.push(contact);
navArr.push(socials);

// change opacity of nav bar according to position
// document.addEventListener("scroll", function () {
// 	navBar.style.opacity = map(scrollY, 0, innerHeight, 0, 1);
// });
// when user scrolls down to first page from homepage
document.body.onload = function () {
	myWorks.style.color = pink;
};
// 'My Works' link
myWorks.addEventListener("click", () => {
	navArr.forEach((e) => {
		e.style.color = white;
	});
	myWorks.style.color = pink;
	const gallery = document.getElementsByClassName("gallery-options")[0];
	gallery.scrollIntoView({ behavior: "smooth", block: "start" });
});
// 'About' link
about.addEventListener("click", () => {
	navArr.forEach((e) => {
		e.style.color = white;
	});
	about.style.color = teal;
	const aboutSection = document.getElementsByClassName("about")[0];
	aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
// 'Contact' link
contact.addEventListener("click", () => {
	navArr.forEach((e) => {
		e.style.color = white;
	});
	contact.style.color = yellow;
	// show contact form when 'contact' is pressed
	contactForm.style.animation =
		"contact-form 300ms ease-out 0s 1 normal forwards";
});
// 'Socials' link
document.body.addEventListener("click", () => {
	socialIcons.style.animation = "";
});
socials.addEventListener("click", (event) => {
	event.stopPropagation();
	navArr.forEach((e) => {
		e.style.color = white;
	});
	socials.style.color = pink;
	socialIcons.style.animation =
		"social-icons 300ms ease-out 0s 1 normal forwards";
});
closeWindow.addEventListener("click", () => {
	contactForm.style.animation = "";
});

// desktop
window.onscroll = function (e) {
	if (innerWidth > 640) {
		// scrolling up
		if (this.oldScroll > this.scrollY) {
			if (scrollY < innerHeight * 0.6) {
				navBar.style.animation =
					"navBarAnimation 600ms ease-in 0s 1 reverse forwards";
			}
		} else {
			// scrolling down
			if (scrollY >= innerHeight * 0.6) {
				navBar.style.animation =
					"navBarAnimation 600ms ease-out 0s 1 normal forwards";
			}
		}
		this.oldScroll = this.scrollY;
	} else {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;

        if (this.oldScroll > this.scrollY) {
            // scrolling up
            if(currentScroll < documentHeight) {
                navBar.style.animation =
					"navBarMobileAnimation 800ms ease-out 0s 1 normal forwards";
            }
			if (scrollY < innerHeight * 0.6) {
				navBar.style.animation =
					"navBarMobileAnimation 800ms ease-in 0s 1 reverse forwards";
			}
		} else {
			// scrolling down
			if (scrollY >= innerHeight * 0.6) {
				navBar.style.animation =
					"navBarMobileAnimation 800ms ease-out 0s 1 normal forwards";
			}
            if(currentScroll == documentHeight) {
                navBar.style.animation =
					"navBarMobileAnimation 800ms ease-out 0s 1 reverse forwards";
            }
		}
		this.oldScroll = this.scrollY;
	}
};
