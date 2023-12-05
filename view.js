import "./view.css";
import cn from "classnames";
import { FindkitUI, html, useCustomRouterData } from "@findkit/ui";

// Prefix added by the Findkit WordPress plugin for the WordPress category
// taxonomy when the category is added to the search index
const TAG_PREFIX = "wp_taxonomy/category/";

function renderArchive(container) {
    // <div class="findkit-blog-archive-results" data-public-token=".." data-instance-id=".."></div>
    const publicToken = container.dataset.publicToken;
    const instanceId = container.dataset.instanceId;

    // Find the elementes nested in the container
    const input = container.querySelector("input.findkit-search-blog");
    const form = container.querySelector("form.findkit-tag-form");
    const resultsContainer = container.querySelector(
        ".findkit-blog-archive-results",
    );

    // Custom Hit slot override for Blog post hits
    // https://docs.findkit.com/ui/slot-overrides/
    // https://docs.findkit.com/ui/slot-overrides/slots#hit
    function Hit(props) {
        // Customo fields exposed using the 'findkit_page_meta' filter in
        // block's the register.php
        const excerpt = props.hit.customFields.excerpt?.value;
        const author = props.hit.customFields.author?.value ?? "Findkit Crew";
        const featuredImage = props.hit.customFields.featuredImage?.value;

        const highlight = props.hit.highlight;

        const [data] = useCustomRouterData();
        const selectedTag = data.selectedTag;

        // Get the tags with the prefix and remove the prefix
        const tags = props.hit.tags.flatMap((tag) => {
            if (tag.startsWith(TAG_PREFIX)) {
                return tag.slice(TAG_PREFIX.length);
            }

            return [];
        });

        const created = new Intl.DateTimeFormat().format(
            new Date(props.hit.created),
        );

        return html`
            <div>
                <h2 class="wp-block-post-title">
                    <a href=${props.hit.url} target="_self"
                        >${props.hit.title}</a
                    >
                </h2>

                <div class="findkit-preview">
                    ${featuredImage ? html`<img src="${featuredImage}" />` : ""}

                    <p class="wp-block-post-excerpt__more-text">
                        <span
                            dangerouslySetInnerHTML=${{
                                __html: highlight || excerpt,
                            }}
                        />
                        ${" "}
                        <a class="findkit-read-more" href=${props.hit.url}>
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
                    ${tags.map(
                        (tag) => html`
                            <button
                                type="button"
                                className=${cn("findkit-tag", {
                                    active: tag === selectedTag,
                                })}
                                onClick=${() => {
                                    searchWithTag(tag);
                                }}
                            >
                                #${tag}
                            </button>
                        `,
                    )}
                </div>
            </div>
        `;
    }

    const ui = new FindkitUI({
        instanceId,
        container: resultsContainer,
        publicToken,

        // Require now terms so the blog posts are show always
        minTerms: 0,

        // The render.php files render the search input so we don't need the
        // default search input in the header
        header: false,

        // Disable shadow DOM so we can style the search results using the view
        // block styles
        shadowDom: false,

        // Customize the search results with the above Hit slot override
        slots: { Hit },

        params: {
            // Show only blog posts
            filter: { tags: "wp_post_type/post" },

            // Show the lates blog posts first
            sort: { created: { $order: "desc" } },
        },
    });

    // Bind the custom input
    ui.bindInput(input);

    // Never submit the form. It is client-side only
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    /**
     * Make search request with the given tag
     */
    function searchWithTag(tag) {
        // Update the form state with the tag if given
        if (tag) {
            updateForm(form, { tag });
        }

        // Save the form state to the custom router data
        // https://docs.findkit.com/ui/api/#defaultCustomRouterData
        ui.setCustomRouterData(Object.fromEntries(new FormData(form)));
        updateSearch();
    }

    /**
     * Read the form and make a new search request base on the form state
     */
    function updateSearch() {
        // https://docs.findkit.com/ui/api/#updateParams
        ui.updateParams((params) => {
            const data = Object.fromEntries(new FormData(form));

            if (data.tag) {
                // if a tag is selected in the form, limit the results to that tag
                params.filter.tags = TAG_PREFIX + data.tag;
            } else {
                // otherwise show all blog posts
                params.filter.tags = "wp_post_type/post";
            }
        });
    }

    // Make a new search when the user interacts with the form
    form.addEventListener("input", () => {
        searchWithTag();
    });

    // Make a new search when the user resets the form
    form.addEventListener("reset", () => {
        // The "reset" events means the form "is going to
        // reset" so we must wait a bit to see empty form
        setTimeout(() => {
            searchWithTag();
        }, 1);
    });

    // On load populate the form with the custom router data
    // https://docs.findkit.com/ui/api/events#custom-router-data
    ui.on("custom-router-data", (e) => {
        updateForm(form, e.data);
        updateSearch();
    });

    // Accessibility: make the form labels selectable with the keyboard
    form.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target instanceof HTMLLabelElement) {
            const input = form.querySelector("#" + e.target.htmlFor);
            input?.click();
        }
    });

    // remove sorting when searching with search terms to get the results by
    // relevance
    // https://docs.findkit.com/ui/api/events#fetch
    ui.on("fetch", (e) => {
        if (e.terms.trim() !== "") {
            e.transientUpdateParams((params) => {
                delete params.sort;
            });
        }
    });

    // Show loading indicator on slow connections
    const loading = container.querySelector(".findkit-blog-archive-loading");

    // https://docs.findkit.com/ui/api/events#loading
    ui.on("loading", () => {
        loading.classList.remove("hide");
    });

    // https://docs.findkit.com/ui/api/events#loading-done
    ui.on("loading-done", () => {
        loading.classList.add("hide");
    });

    // https://docs.findkit.com/ui/api/#addTranslation
    ui.addTranslation("en-US", {
        "all-results-shown": "All blog posts shown",
    });
}

// The block can be added multiple times on the same page so find all the
// blocks and initiate the Findkit UI on each.
const containers = document.querySelectorAll(".findkit-blog-archive");
for (const container of containers) {
    renderArchive(container);
}

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
