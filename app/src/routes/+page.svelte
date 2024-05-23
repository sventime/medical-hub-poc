<script lang="ts">
	import {
		Section,
		ArticleAuthor,
		ArticleBody,
		ArticleHead,
		ArticleWrapper,
		BlogBodyWrapper
	} from 'flowbite-svelte-blocks';
	import {
		PUBLIC_ALGOLIA_PROVIDER_ADMIN_API_KEY,
		PUBLIC_ALGOLIA_PROVIDER_APPLICATION_ID
	} from '$env/static/public';
	import {
		VideoCameraSolid,
		ArrowRightOutline,
		NewspaperSolid,
		DownloadSolid
	} from 'flowbite-svelte-icons';
	import type { PageData } from './$types';

	import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { Search } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import algoliasearch from 'algoliasearch/lite';

	const searchClient = algoliasearch(
		PUBLIC_ALGOLIA_PROVIDER_APPLICATION_ID,
		PUBLIC_ALGOLIA_PROVIDER_ADMIN_API_KEY
	);
	const index = searchClient.initIndex('development_api::document.document');

	let searchedDocuments = [];
	const search = async (term) => {
		const { hits } = await index.search(term);
		searchedDocuments = hits;
	};

	export let data: PageData = [];

	let searchValue = '';
	let timer;
	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchValue = v;
		}, 500);
	};

	$: search(searchValue);
</script>

<Section name="blog" sectionClass="container">
	<h1 class="mb-10 text-4xl">Documents</h1>

	<div
		class="mb-10 flex justify-between gap-10 rounded-md bg-gray-600 p-5 px-7 shadow-inner shadow-gray-800"
	>
		<div class="flex gap-10">
			<Button
				>Select Product
				<ChevronDownOutline class="ml-2 h-3 w-3 text-white dark:text-white" />
			</Button>
			<Dropdown class="ext-sm w-44 space-y-3 rounded-md border p-3 dark:!border-gray-500">
				<li>
					<Checkbox class="cursor-pointer">Daxxify (1)</Checkbox>
				</li>
				<li>
					<Checkbox class="cursor-pointer">RHA1 (1)</Checkbox>
				</li>
				<li>
					<Checkbox class="cursor-pointer">RHA2 (1)</Checkbox>
				</li>
				<li>
					<Checkbox class="cursor-pointer">RHA3 (1)</Checkbox>
				</li>
				<li>
					<Checkbox class="cursor-pointer">RHA4 (1)</Checkbox>
				</li>
			</Dropdown>

			<Button>
				Author
				<ChevronDownOutline class="ml-2 h-3 w-3 text-white dark:text-white" />
			</Button>
			<Dropdown class="ext-sm space-y-3 rounded-md border p-3 dark:!border-gray-500">
				<li>
					<Checkbox class="cursor-pointer">Danylo Semirazov</Checkbox>
				</li>
			</Dropdown>
		</div>

		<form class="flex gap-2">
			<Search
				size="lg"
				class="w-[450px]"
				on:input={(e) => {
					debounce(e.target.value);
				}}
			/>
			<Dropdown class="ext-sm w-[450px] space-y-3 rounded-md border p-3 dark:!border-gray-500">
				{#if !searchValue}
					<li>Type to search...</li>
				{:else}
					{#each searchedDocuments as document}
						<DropdownItem href="/">{document.title}</DropdownItem>
					{/each}
				{/if}
			</Dropdown>
			<Button class="!p-2.5">
				<SearchOutline class="h-6 w-6" />
			</Button>
		</form>
	</div>

	<div class="mb-10 rounded-md bg-gray-600 p-7 shadow-inner shadow-gray-800">
		<BlogBodyWrapper>
			{#each data.documents as document}
				<ArticleWrapper>
					<ArticleHead>
						<span
							class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800"
						>
							{document.attributes.product}
						</span>
						<span class="text-sm">{document.attributes.date}</span>
					</ArticleHead>
					<ArticleBody>
						<svelte:fragment slot="h2"
							><a href="/" class="line-clamp-1">{document.attributes.title}</a></svelte:fragment
						>
						<svelte:fragment slot="paragraph">
							<p class="mb-5 line-clamp-4 font-light text-gray-500 dark:text-gray-400">
								{document.attributes.description}
							</p>
						</svelte:fragment>
					</ArticleBody>
					<ArticleAuthor>
						<svelte:fragment slot="author">
							<img
								class="h-7 w-7 rounded-full"
								src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
								alt="Jese Leos avatar"
							/>
							<span class="font-medium dark:text-white"> {document.attributes.author} </span>
						</svelte:fragment>
						<a
							href={'http://localhost:1337/' + document?.attributes?.pdf?.url}
							class="inline-flex items-center font-medium text-primary-600 hover:underline dark:text-primary-500"
						>
							Download
							<DownloadSolid size="sm" class="ml-2" />
						</a>
					</ArticleAuthor>
				</ArticleWrapper>
			{/each}
		</BlogBodyWrapper>
	</div>
</Section>
