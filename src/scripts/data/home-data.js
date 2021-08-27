export const homeData = {
	get url() {
		return '/';
	},
	get heroBg() {
		return {
			alt: "Pendrake's Chamber, an isometric illustration of a medieval fantasy bedroom by Kyle Jorve",
			sources: [
				{
					url: '/dist/media/images/home-hero/home-hero-1920.jpg',
					minScreenSize: 1440
				},
				{
					url: '/dist/media/images/home-hero/home-hero-1440.jpg',
					minScreenSize: 1024
				},
				{
					url: '/dist/media/images/home-hero/home-hero-1024.jpg',
					minScreenSize: 640
				}
			],
			mobileSource: '/dist/media/images/home-hero/home-hero-640.jpg'
		};
	},
	get intro() {
		return {
			title: 'Kyle Jorve',
			subtitle: 'Illustration and Design'
		};
	},
	get portfolio() {
		return {
			itemsLimit: 4,
			heading: 'Featured Work',
			btnText: 'View Portfolio'
		};
	},
	get bio() {
		return {
			buttonText: 'See R&eacute;sum&eacute;',
			img: {
				sources: [
					{
						url: '/dist/media/images/portrait/portrait-1920.jpg',
						minScreenSize: 1440
					},
					{
						url: '/dist/media/images/portrait/portrait-1440.jpg',
						minScreenSize: 1024
					},
					{
						url: '/dist/media/images/portrait/portrait-1024.jpg',
						minScreenSize: 640
					}
				],
				mobileSource: '/dist/media/images/portrait/portrait-640.jpg',
				square: '/dist/media/images/portrait/portrait-square-640.jpg',
				alt: 'A photograph of Kyle Jorve smiling at the camera, a blurred scene of lush plant life behind him'
			}
		};
	}
};
