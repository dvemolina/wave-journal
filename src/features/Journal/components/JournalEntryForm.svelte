<script lang="ts">
	import { journalEntrySchema, type JournalEntrySchema } from '../lib/journalValidation';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		data: { form: SuperValidated<Infer<JournalEntrySchema>> };
	}

	let { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(journalEntrySchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field></Form.Field>
</form>
