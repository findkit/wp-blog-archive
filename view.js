import "./view.css";

import { FindkitUI, select, html } from "@findkit/ui";

const TAG_PREFIX = "wp_taxonomy/post_tag/";

function renderArchive(container, index) {
    const publicToken = container.dataset.publicToken;
    if (!publicToken) {
        console.error("Missing public token");
        return;
    }

    const form = container.querySelector("form.findkit-tag-form");

    const ui = new FindkitUI({
        instanceId: container.dataset.instanceId || "blog_" + (index + 1),
        container: container.querySelector(".findkit-blog-archive-results"),
        publicToken,
        minTerms: 0,
        header: false,
        shadowDom: false,
        slots: {
            Hit(props) {
                const excerpt = props.hit.customFields.excerpt?.value;
                const author =
                    props.hit.customFields.author?.value ?? "Findkit Crew";
                const featuredImage =
                    props.hit.customFields.featuredImage?.value;
                const highlight = props.hit.highlight;
                const tags = props.hit.tags.flatMap(tag => {
                    if (tag.startsWith(TAG_PREFIX)) {
                        return tag.slice(TAG_PREFIX.length);
                    }

                    return [];
                });

                const created = new Intl.DateTimeFormat().format(
                    new Date(props.hit.created),
                );

                //  prettier-ignore
                return html`
                    <div>

                        <h2 class="wp-block-post-title">
                            <a href=${props.hit.url} target="_self">${props.hit.title}</a>
                        </h2>

                        <div class="findkit-preview">
                            ${featuredImage ? html`<img src="${featuredImage}" />` : ""}

                            <p class="wp-block-post-excerpt__more-text">
                                <span dangerouslySetInnerHTML=${{ __html: highlight || excerpt }} />
                                ${" "}
                                <a class="wp-block-post-excerpt__more-link"
                                    href=${props.hit.url} >
                                    Read more
                                </a>
                            </p>
                        </div>

                        <div class="wp-block-post-author__content">
                            <p class="wp-block-post-author__name">
                                ${author} at ${created}
                            </p>
                        </div>

                        <div class="findkit-hit-tags">
                            ${tags.map(tag => html`<button
                                type="button"
                                className="findkit-tag"
                                onClick=${() => {
                                    updateForm(form, { tag });
                                    updateSearch();
                                }}
                            >#${tag}</button>`)}
                        </div>

                    </div>
                `;
            },
        },
        params: {
            filter: { tags: "wp_post_type/post" },
        },
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
    });

    form.addEventListener("input", () => {
        ui.setCustomRouterData(Object.fromEntries(new FormData(form)));
        updateSearch();
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            ui.setCustomRouterData(Object.fromEntries(new FormData(form)));
            updateSearch();
        }, 1);
    });

    ui.on("custom-router-data", e => {
        updateForm(form, e.data);
        updateSearch();
    });

    form.addEventListener("keydown", e => {
        if (e.key === "Enter" && e.target instanceof HTMLLabelElement) {
            const input = form.querySelector("#" + e.target.htmlFor);
            input?.click();
        }
    });

    const loading = container.querySelector(".findkit-blog-archive-loading");

    function updateSearch() {
        ui.updateParams(params => {
            const data = Object.fromEntries(new FormData(form));

            if (data.tag) {
                params.filter.tags = TAG_PREFIX + data.tag;
            } else {
                params.filter.tags = "wp_post_type/post";
            }
        });
    }

    ui.on("fetch", e => {
        if (e.terms.trim() === "") {
            e.transientUpdateParams(params => {
                params.sort = { created: { $order: "desc" } };
            });
        }
    });

    ui.on("loading", () => {
        loading.classList.remove("hide");
    });

    ui.on("loading-done", () => {
        loading.classList.add("hide");
    });

    ui.bindInput(container.querySelector("input"));

    ui.addTranslation("en-US", {
        "all-results-shown": "All blog posts shown",
    });
}

select(".findkit-blog-archive", HTMLDivElement, (...containers) => {
    containers.forEach(renderArchive);
});

/**
 * See https://findk.it/update-form
 *
 * @param {HTMLFormElement} form
 * @param {{ [key: string]: string | string[] }} data
 */
function updateForm(form, data) {
    for (const [key, values] of Object.entries(data)) {
        const item = form.elements.namedItem(key);
        const arrayValues = Array.isArray(values) ? values : [values];
        for (const value of arrayValues) {
            const list =
                item instanceof RadioNodeList ? Array.from(item) : [item];
            for (const el of list) {
                if (el instanceof HTMLSelectElement) {
                    for (const option of el.options) {
                        if (option.value === value) {
                            option.selected = true;
                            continue;
                        }
                    }
                } else if (el instanceof HTMLInputElement) {
                    if (el.type === "checkbox" || el.type === "radio") {
                        if (el.value === value) {
                            el.checked = true;
                            continue;
                        }
                    } else {
                        el.value = value;
                    }
                }
            }
        }
    }
}
