//Placeholder

/*
# Info so far:

* Categories can be extracted from getCmsPage: https://www.mega-image.ro/api/v1/?operationName=getCmsPage&variables=%7B%22url%22%3A%22%2F%22%2C%22isPreview%22%3Afalse%2C%22channel%22%3A%22ro%22%2C%22locale%22%3A%22ro%22%2C%22lang%22%3A%22ro%22%2C%22isLoggedIn%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22b137fd123ab41c5ada3057e52bbaa705d90514eab3874e2e5686451d3f0a58e5%22%7D%7D

    - Look for the object with "name": "categories",
    - entry "categoryItems"
    - we're interested in the "001", "002", etc ids
    - they can be sent to the category product search query: https://www.mega-image.ro/api/v1/?operationName=GetCategoryProductSearch&variables=%7B%22lang%22%3A%22ro%22%2C%22searchQuery%22%3A%22%22%2C%22category%22%3A%22002004%22%2C%22pageNumber%22%3A1%2C%22pageSize%22%3A20%2C%22filterFlag%22%3Atrue%2C%22plainChildCategories%22%3Atrue%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2225fdff69c2396b20f500d39cc3e5967a066ee90eb8678e1e264575dfb9433060%22%7D%7D
        - to get even more subcategories (and sub-sub-categories)



*/

// const axios = require("axios");
// const utils = require("./utils");
// const HTMLParser = require("node-html-parser");
// const MAXITEMS = 10000;

// const units = {
//     bd: { unit: "stk", factor: 1 },
//     gr: { unit: "g", factor: 1 },
//     lt: { unit: "ml", factor: 1000 },
//     pk: { unit: "stk", factor: 1 },
//     pa: { unit: "stk", factor: 1 },
//     rl: { unit: "stk", factor: 1 },
//     tb: { unit: "stk", factor: 1 },
// };

// exports.getCanonical = function (item, today) {
//     let quantity = item.amount;
//     let unit = item.volumeLabelKey;
//     return utils.convertUnit(
//         {
//             id: item.productId,
//             name: item.name,
//             // description: "", not available
//             price: item.price.regular.value / 100,
//             priceHistory: [{ date: today, price: item.price.regular.value / 100 }],
//             isWeighted: item.isWeightArticle,
//             unit,
//             quantity,
//             bio: item.name.toLowerCase().includes("bio") && !item.name.toLowerCase().includes("fabio"),
//             url: item.sku.replace("-", ""),
//         },
//         units,
//         "penny"
//     );
// };

// exports.fetchData = async function () {
//     hits = 100;
//     page = 0;
//     done = false;
//     result = [];
//     while (!done) {
//         const PENNY_SEARCH = `https://www.penny.ro/api/products?page=${page}&pageSize=${hits}`;
//         data = (await axios.get(PENNY_SEARCH)).data;
//         done = data.count < hits || page * hits > MAXITEMS;
//         page++;
//         result = result.concat(data.results);
//     }
//     return result;
// };

// async function parseCategory(url, parent, result, lookup) {
//     const data = (await axios.get(url)).data;
//     const dom = HTMLParser.parse(data);
//     const categoryTitle = dom.querySelector('[data-test="category-title"]')?.textContent;
//     if (url != "https://www.penny.ro/categorie/" && categoryTitle.includes("Toate categoriile de produse")) return;
//     const categories = dom.querySelectorAll('[data-test="category-tree-navigation-button"]');
//     for (const category of categories) {
//         const link = "https://www.penny.ro" + category.getAttribute("href");
//         if (!category.querySelector(".subtitle-2")) continue;
//         const name = (parent ? parent + " -> " : "") + category.querySelector(".subtitle-2").innerText.trim().replace("&amp;", "&");
//         if (name.startsWith("Alle Angebote")) continue;

//         if (!lookup.has(link)) {
//             lookup.add(link);
//             result.push({
//                 id: name,
//                 url: link,
//                 code: null,
//             });

//             try {
//                 await parseCategory(link, name, result, lookup);
//             } catch (e) {
//                 // Ignore, sometimes the server responds with 502. No idea why
//             }
//         }
//     }
// }

// exports.initializeCategoryMapping = async () => {
//     const categories = [];
//     await parseCategory("https://www.penny.ro/categorie", null, categories, new Set());
//     utils.mergeAndSaveCategories("penny", categories);

//     exports.categoryLookup = {};
//     for (const category of categories) {
//         exports.categoryLookup[category.id] = category;
//     }
// };

// exports.mapCategory = (rawItem) => {
//     const categoryPath = rawItem.parentCategories.filter((path) => path.length > 0 && !path[0].name.includes("ngebot"))[0];
//     if (!categoryPath) return null;
//     const categoryName = categoryPath.map((path) => path.name).join(" -> ");
//     const category = exports.categoryLookup[categoryName];
//     if (category) return category.code;
//     return null;
// };

// exports.urlBase = "https://www.penny.ro/products/";

// if (require.main == module) {
//     (async () => {
//         await exports.initializeCategoryMapping();
//     })();
// }
