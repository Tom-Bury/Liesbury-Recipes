if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,a,i)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const n={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return r;case"module":return n;default:return e(s)}}))).then((e=>{const s=i(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts("fallback-E-4RUCMal14XCiNbehBwA.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/E-4RUCMal14XCiNbehBwA/_buildManifest.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/E-4RUCMal14XCiNbehBwA/_ssgManifest.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/282-26b8230105c1a7e1e51b.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/288-64b780f86435c5d27307.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/942-a352c8a14f2e6a25a037.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/framework-737b57d65c7ddec02a17.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/main-0e72df510668a92c270f.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/pages/_app-eb59f297f59a023d47ed.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/pages/_error-de599369f9207bac2e35.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/pages/_offline-ef120ee13bb30f9353a2.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/pages/index-69972d551b8958ad8586.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/pages/recipe/%5BrecipeId%5D-27bfd34465c3aaeed7e9.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/chunks/webpack-4755d1c0768947b7172e.js",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/css/0b4aaa461920a10d362b.css",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/css/5118ffc6ff9cb06de5df.css",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_next/static/css/9272d16463cf6ad67307.css",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/_offline",revision:"E-4RUCMal14XCiNbehBwA"},{url:"/favicon.ico",revision:"54dba7508af2e0a4392cb6510888310f"},{url:"/icons/liesbury-192.png",revision:"6a52ba0430ae23387f5a2db3420ba2db"},{url:"/icons/liesbury-512.png",revision:"b3d1b2301da9aee1faa615d5266082d8"},{url:"/icons/liesbury_maskable_icon_x128.png",revision:"25bab6541268c77c67fbfd0302cc4ae9"},{url:"/icons/liesbury_maskable_icon_x192.png",revision:"c4219acc1b02ea0c79e778e913ae822c"},{url:"/icons/liesbury_maskable_icon_x384.png",revision:"6d9abb058d4b7a31c88be27c2d067a6d"},{url:"/icons/liesbury_maskable_icon_x48.png",revision:"78dc46db047163e5298bfda4257354e5"},{url:"/icons/liesbury_maskable_icon_x512.png",revision:"e738234875b6b6c645863effc4fd7de7"},{url:"/icons/liesbury_maskable_icon_x72.png",revision:"4e3a66d01d0632716366687eb0d893e5"},{url:"/icons/liesbury_maskable_icon_x96.png",revision:"0e7efd0942f1decbbc1f284a6c325150"},{url:"/icons/link.svg",revision:"051783ac3935bf70397fcd0a6b9d0456"},{url:"/icons/search.svg",revision:"84433ae7afa0c709a11913af7fbf87ea"},{url:"/images/liesbury-og-image.png",revision:"534156f9d7bd5c3a176db09c9446eed1"},{url:"/images/liesbury-recipes-colored.svg",revision:"5664f7c9e73c5457e5ebb8e1ba53d65b"},{url:"/manifest.json",revision:"a96a50cae9b2586e48926f6c5a3f9514"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:r,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
