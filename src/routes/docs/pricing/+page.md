---
lastUpdate: 25/01/2025
---

# Pricing

A component to show a pricing table.

<img class="rounded-lg my-5" src="../pricing.png" alt="Pricing" />

## Usage

```svelte ln
<script>
    import Pricing from '$lib/components/layout/pricing.svelte';

    type Props = {
	products: ProductWithVariants;
	subscriptions: SubscriptionDetails[];
	user: User | null;
    };

    let { products, subscriptions, user }: Props = $props();
</script>

<Pricing {products} {subscriptions} {user} />
```