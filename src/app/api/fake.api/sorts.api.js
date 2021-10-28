const sorts = {
	price: "Цена",
	name: "Название",
	rating: "Рейтинг товара",
	reviews: "Количество отзывов"
};

const fetchAll = () =>
	new Promise((resolve) => {
		window.setTimeout(function () {
			resolve(sorts);
		}, 2000);
	});

export default {
	fetchAll
};
