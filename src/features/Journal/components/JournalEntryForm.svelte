<script lang="ts">
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$src/components/ui/form/index';
	import { Input } from '$src/components/ui/input/index';
	import { formattedEnums } from '$src/lib/enums/formatEnums';
	import { journalEntrySchema, type JournalEntrySchema } from '../lib/validations';
	import * as RadioGroup from '$src/components/ui/radio-group';

	let { data }: { data: { form: SuperValidated<Infer<JournalEntrySchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(journalEntrySchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="entryDetails.date">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Date of the session</Form.Label>
				<Input type="date" {...props} bind:value={$formData.entryDetails.date} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Fieldset {form} name="entryDetails.sessionType">
		<Form.Legend>Type of session</Form.Legend>
		<RadioGroup.Root
			bind:value={$formData.entryDetails.sessionType}
			name="entryDetails.sessionType"
		>
			<div class="flex items-center space-y-0 space-x-3">
				{#each formattedEnums.SessionType as sessionType}
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center space-x-2">
								<RadioGroup.Item {...props} value={sessionType.value} id={sessionType.value} />
								<Form.Label for={sessionType.value}>{sessionType.label}</Form.Label>
							</div>
						{/snippet}
					</Form.Control>
				{/each}
			</div>
		</RadioGroup.Root>
	</Form.Fieldset>
</form>
