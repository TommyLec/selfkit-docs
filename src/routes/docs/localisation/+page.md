---
lastUpdate: 14/01/2025
---

# Localisation

**SelfKit** use Paraglide to handle Internationalization.

## Why paraglide ?

Paraglide simplifies internationalization by seamlessly integrating localization with SvelteKit’s routing and reactivity. It offers dynamic language switching, localized routing, ensuring a smooth multilingual user experience and maintainable codebase.

It is extremely lightweight and does not depend on any cloud or external services.

## Setup

No specific setup is required. Paraglide automatically detects the browser's language and displays the appropriate one. If the selected language is unavailable, it defaults to English.

## Add language

By default, **SelfKit** comes with two languages: English and French.
All translations are stored in ```messages/[language-tag].json``` and follow this structure:

```svelte
// messages/en.json
{
	// The $schema key is automatically ignored
	"$schema": "https://inlang.com/schema/inlang-message-format",
	"hello_world": "Hello world!",
	"dark_salty_newt_talk": "Contact Us",
}
```

To add a new language, simply create a new file (e.g., ```de.json```) with the same keys as the other languages.

## Using translations in Code

All translations are generated in ```src/lib/paraglide/messages.js```. You juste have to use wildwcard import like this:

```svelte
<script>
	import * as m from '$lib/paraglide/messages.js'
</script>

<p>{m.dark_salty_newt_talk()}</p>
```

:::note
You might wonder why we use names like ```dark_salty_newt_talk``` instead of something like ```contact_us_message```. It's simply a good naming practice. You can find more information [here](https://inlang.com/documentation/concept/message#idhuman-readable).
:::

## Tools

### VSCode extension

Paraglide provide a VSCode extension to easily handle translations. We highly recommand to install it for smooth devlopment experience.

[Sherlock - VS Code extension](https://inlang.com/m/r7kp499g/app-inlang-ideExtension)

## Limitations

Here are some limitations to keep in mind:
- If you're using Vercel, modifications are required to ensure proper functionality ([more informations](https://github.com/sveltejs/kit/issues/11879)).
- Variants, such as pluralization or gender-specific terms, are not supported ([more informations](https://github.com/opral/inlang-paraglide-js/issues/201)).
- Translations only work within your codebase, so database-stored messages are not translated. We recommend creating alternative database tables to handle translations in such cases.

## Links

- [Paraglide-SvelteKit](https://inlang.com/m/dxnzrydw/paraglide-sveltekit-i18n)
- [Praglide VSCode extension](https://inlang.com/m/r7kp499g/app-inlang-ideExtension)