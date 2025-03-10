<script lang="ts">
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$src/components/ui/form/index';
	import { Input } from '$src/components/ui/input/index';
	import { formattedEnums } from '$src/lib/enums/formatEnums';

	import * as RadioGroup from '$src/components/ui/radio-group';
	import * as Select from '$src/components/ui/select';
	import * as Textarea from '$src/components/ui/textarea';
	import { Checkbox } from '$src/components/ui/checkbox';
	import { journalEntrySchema, type JournalEntrySchema } from '../lib/validations';

	let { data, spots }: { data: { form: SuperValidated<Infer<JournalEntrySchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(journalEntrySchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	function addItem(value: string, fieldPath: string[]) {
		// Ensure that you're adding the full value as a string
		const currentValue = $formData[fieldPath[0]][fieldPath[1]];
		if (!currentValue.includes(value)) {
			$formData[fieldPath[0]][fieldPath[1]] = [...currentValue, value];
		}
	}

	function removeItem(value: string, fieldPath: string[]) {
		// Ensure that you're removing the full value as a string
		$formData[fieldPath[0]][fieldPath[1]] = $formData[fieldPath[0]][fieldPath[1]].filter((v: string) => v !== value);
	}

</script>

<form method="POST" use:enhance class="flex flex-col gap-6">

	<!-- ENTRY DETAILS SECTION-->
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

	<Form.Field {form} name="entryDetails.breakId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Surf Break</Form.Label>
				<Select.Root type="single" name={props.name} bind:value={$formData.entryDetails.breakId}>
					<Select.Trigger class="w-full">Select the break</Select.Trigger>
					<Select.Content>
						{#each spots as spot}
							<Select.Item value={spot.id}>{spot.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex flex-col gap-1">
		<Form.Field {form} name="entryDetails.startTime">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Session Start Time</Form.Label>
					<Input type="time" {...props} bind:value={$formData.entryDetails.startTime} />
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="entryDetails.endTime">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Session End Time</Form.Label>
					<Input type="time" {...props} bind:value={$formData.entryDetails.endTime} />
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- WAVE CONDITIONS SECTION -->

	<Form.Field {form} name="waveConditions.height">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Height (Perceived)</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.height}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.height}
					{formattedEnums.WaveHeight.find(item => item.value === $formData.waveConditions.height)?.label}
				{:else}
					Select the height measure
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveHeight as waveHeight}
				<Select.Item value={waveHeight.value}>{waveHeight.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="waveConditions.character">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Character (Perceived)</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.character}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.character}
					{formattedEnums.WaveCharacter.find(item => item.value === $formData.waveConditions.character)?.label}
				{:else}
				Select the character
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveCharacter as character}
				<Select.Item value={character.value}>{character.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="waveConditions.frequency">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Frequency (Wait Time)</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.frequency}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.frequency}
					{formattedEnums.WaveFrequency.find(item => item.value === $formData.waveConditions.frequency)?.label}
				{:else}
					Select the wait time
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveFrequency as frequency}
				<Select.Item value={frequency.value}>{frequency.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	
	<Form.Field {form} name="waveConditions.tideMovement">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Tide Movement</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.tideMovement}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.tideMovement}
					{formattedEnums.TideMovement.find(item => item.value === $formData.waveConditions.tideMovement)?.label}
				{:else}
					Select the tide movement
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.TideMovement as tideMovement}
				<Select.Item value={tideMovement.value}>{tideMovement.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="waveConditions.peelDirection">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Peel Direction</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.peelDirection}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.peelDirection}
					{formattedEnums.WavePeeling.find(item => item.value === $formData.waveConditions.peelDirection)?.label}
				{:else}
					Select the peel direction
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WavePeeling as peelDirection}
				<Select.Item value={peelDirection.value}>{peelDirection.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="waveConditions.peelSpeed">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Peel Speed</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.peelSpeed}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.peelSpeed}
					{formattedEnums.WavePeelSpeed.find(item => item.value === $formData.waveConditions.peelSpeed)?.label}
				{:else}
				Select the peel speed
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WavePeelSpeed as peelSpeed}
				<Select.Item value={peelSpeed.value}>{peelSpeed.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="waveConditions.wallShape">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Wall Shape</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.wallShape}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.wallShape}
					{formattedEnums.WaveWallShape.find(item => item.value === $formData.waveConditions.wallShape)?.label}
				{:else}
				Select the wall shape
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveWallShape as wallShape}
				<Select.Item value={wallShape.value}>{wallShape.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	
	<Form.Field {form} name="waveConditions.steepness">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Steepness</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.steepness}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.steepness}
					{formattedEnums.WaveSteepness.find(item => item.value === $formData.waveConditions.steepness)?.label}
				{:else}
					Select the steepness
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveSteepness as steepness}
				<Select.Item value={steepness.value}>{steepness.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="waveConditions.shallowness">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wave Shallowness</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.waveConditions.shallowness}>
			<Select.Trigger class="w-full">
				{#if $formData.waveConditions.shallowness}
					{formattedEnums.WaveShallowness.find(item => item.value === $formData.waveConditions.shallowness)?.label}
				{:else}
					Select the shallowness
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each formattedEnums.WaveShallowness as shallowness}
				<Select.Item value={shallowness.value}>{shallowness.label}</Select.Item>
				{/each}
			</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
  
	<!-- WIND CONDITIONS SECTION -->
	<Form.Field {form} name="windConditions.direction">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wind Direction</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.windConditions.direction}>
				<Select.Trigger class="w-full">
					{#if $formData.windConditions.direction}
						{formattedEnums.WindDirection.find(item => item.value === $formData.windConditions.direction)?.label}
					{:else}
						Select the wind direction
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.WindDirection as direction}
						<Select.Item value={direction.value}>{direction.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="windConditions.consistency">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wind Consistency</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.windConditions.consistency}>
				<Select.Trigger class="w-full">
					{#if $formData.windConditions.consistency}
						{formattedEnums.WindConsistency.find(item => item.value === $formData.windConditions.consistency)?.label}
					{:else}
						Select the wind consistency
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.WindConsistency as consistency}
						<Select.Item value={consistency.value}>{consistency.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="windConditions.strength">
		<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Wind Strength</Form.Label>
			<Select.Root type="single" name={props.name} bind:value={$formData.windConditions.strength}>
				<Select.Trigger class="w-full">
					{#if $formData.windConditions.strength}
						{formattedEnums.WindStrength.find(item => item.value === $formData.windConditions.strength)?.label}
					{:else}
						Select the wind strength
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.WindStrength as strength}
						<Select.Item value={strength.value}>{strength.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<!-- ENVIRONMENT CONDITIONS SECTION -->
	<Form.Field {form} name="environmentConditions.current">
		<Form.Control>
		<Form.Label>Current Rip</Form.Label>
		<Select.Root type="single" name="environmentConditions.current" bind:value={$formData.environmentConditions.current}>
			<Select.Trigger class="w-full">
			{#if $formData.environmentConditions.current}
				{formattedEnums.CurrentRip.find(item => item.value === $formData.environmentConditions.current)?.label}
			{:else}
				Select the current rip
			{/if}
			</Select.Trigger>
			<Select.Content>
			{#each formattedEnums.CurrentRip as current}
				<Select.Item value={current.value}>{current.label}</Select.Item>
			{/each}
			</Select.Content>
		</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="environmentConditions.rockDanger">
		<Form.Control>
		<Form.Label>Rock Danger</Form.Label>
		<Select.Root type="single" name="environmentConditions.rockDanger" bind:value={$formData.environmentConditions.rockDanger}>
			<Select.Trigger class="w-full">
			{#if $formData.environmentConditions.rockDanger}
				{formattedEnums.RockDanger.find(item => item.value === $formData.environmentConditions.rockDanger)?.label}
			{:else}
				Select rock danger level
			{/if}
			</Select.Trigger>
			<Select.Content>
			{#each formattedEnums.RockDanger as rockDanger}
				<Select.Item value={rockDanger.value}>{rockDanger.label}</Select.Item>
			{/each}
			</Select.Content>
		</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="environmentConditions.waterQuality">
		<Form.Control>
		<Form.Label>Water Quality</Form.Label>
		<Select.Root type="single" name="environmentConditions.waterQuality" bind:value={$formData.environmentConditions.waterQuality}>
			<Select.Trigger class="w-full">
			{#if $formData.environmentConditions.waterQuality}
				{formattedEnums.WaterQuality.find(item => item.value === $formData.environmentConditions.waterQuality)?.label}
			{:else}
				Select water quality
			{/if}
			</Select.Trigger>
			<Select.Content>
			{#each formattedEnums.WaterQuality as waterQuality}
				<Select.Item value={waterQuality.value}>{waterQuality.label}</Select.Item>
			{/each}
			</Select.Content>
		</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="environmentConditions.waterSurface">
		<Form.Control>
		<Form.Label>Water Surface</Form.Label>
		<Select.Root type="single" name="environmentConditions.waterSurface" bind:value={$formData.environmentConditions.waterSurface}>
			<Select.Trigger class="w-full">
			{#if $formData.environmentConditions.waterSurface}
				{formattedEnums.WaterSurface.find(item => item.value === $formData.environmentConditions.waterSurface)?.label}
			{:else}
				Select water surface condition
			{/if}
			</Select.Trigger>
			<Select.Content>
			{#each formattedEnums.WaterSurface as waterSurface}
				<Select.Item value={waterSurface.value}>{waterSurface.label}</Select.Item>
			{/each}
			</Select.Content>
		</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	
	
	
	
	<!-- CROWD CONDITIONS SECTION -->
	<Form.Field {form} name="crowdConditions.vibe">
		<Form.Control>
			<Form.Label>Vibe in Water</Form.Label>
			<Select.Root type="single" name="crowdConditions.vibe" bind:value={$formData.crowdConditions.vibe}>
				<Select.Trigger class="w-full">
					{#if $formData.crowdConditions.vibe}
						{formattedEnums.VibeInWater.find(item => item.value === $formData.crowdConditions.vibe)?.label}
					{:else}
						Select vibe in water
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.VibeInWater as vibe}
						<Select.Item value={vibe.value}>{vibe.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="crowdConditions.volume">
		<Form.Control>
			<Form.Label>Crowd Volume</Form.Label>
			<Select.Root type="single" name="crowdConditions.volume" bind:value={$formData.crowdConditions.volume}>
				<Select.Trigger class="w-full">
					{#if $formData.crowdConditions.volume}
						{formattedEnums.CrowdVolume.find(item => item.value === $formData.crowdConditions.volume)?.label}
					{:else}
						Select crowd volume
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.CrowdVolume as volume}
						<Select.Item value={volume.value}>{volume.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="crowdConditions.skillLevel">
		<Form.Control>
			<Form.Label>Skill Level</Form.Label>
			<Select.Root type="single" name="crowdConditions.skillLevel" bind:value={$formData.crowdConditions.skillLevel}>
				<Select.Trigger class="w-full">
					{#if $formData.crowdConditions.skillLevel}
						{formattedEnums.CrowdSkillLevel.find(item => item.value === $formData.crowdConditions.skillLevel)?.label}
					{:else}
						Select skill level
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.CrowdSkillLevel as skillLevel}
						<Select.Item value={skillLevel.value}>{skillLevel.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<!-- GEAR USED SECTION -->
	<Form.Field {form} name="gearUsed.boardId">
		<Form.Control>
			<Form.Label>Board</Form.Label>
			<Select.Root type="single" name="gearUsed.boardId" bind:value={$formData.gearUsed.boardId}>
				<Select.Trigger class="w-full">
					{#if $formData.gearUsed.boardId}
						{formattedEnums.Boards.find(item => item.value === $formData.gearUsed.boardId)?.label}
					{:else}
						Select your board
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.Boards as board}
						<Select.Item value={board.value}>{board.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="gearUsed.wetsuitThickness">
		<Form.Control>
			<Form.Label>Wetsuit Thickness</Form.Label>
			<Select.Root type="single" name="gearUsed.wetsuitThickness" bind:value={$formData.gearUsed.wetsuitThickness}>
				<Select.Trigger class="w-full">
					{#if $formData.gearUsed.wetsuitThickness}
					{formattedEnums.WetsuitThickness.find(item => item.value === $formData.gearUsed.wetsuitThickness)?.label}
					{:else}
						Select wetsuit thickness
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.WetsuitThickness as wetsuitThickness}
						<Select.Item value={wetsuitThickness.value}>{wetsuitThickness.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	
	<Form.Field {form} name="gearUsed.gloves">
		<Form.Control>
			<Form.Label>Gloves</Form.Label>
			<Select.Root type="single" name="gearUsed.gloves" bind:value={$formData.gearUsed.gloves}>
				<Select.Trigger class="w-full">
					{#if $formData.gearUsed.gloves}
						{$formData.gearUsed.gloves ? 'Yes' : 'No'}
					{:else}
						Select if gloves were used
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value={true}>Yes</Select.Item>
					<Select.Item value={false}>No</Select.Item>
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="gearUsed.boots">
		<Form.Control>
			<Form.Label>Boots</Form.Label>
			<Select.Root type="single" name="gearUsed.boots" bind:value={$formData.gearUsed.boots}>
				<Select.Trigger class="w-full">
					{#if $formData.gearUsed.boots}
						{$formData.gearUsed.boots ? 'Yes' : 'No'}
					{:else}
						Select if boots were used
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value={true}>Yes</Select.Item>
					<Select.Item value={false}>No</Select.Item>
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="gearUsed.hood">
		<Form.Control>
			<Form.Label>Hood</Form.Label>
			<Select.Root type="single" name="gearUsed.hood" bind:value={$formData.gearUsed.hood}>
				<Select.Trigger class="w-full">
					{#if $formData.gearUsed.hood}
						{$formData.gearUsed.hood ? 'Yes' : 'No'}
					{:else}
						Select if hood was used
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value={true}>Yes</Select.Item>
					<Select.Item value={false}>No</Select.Item>
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<!-- PERSONAL PERFORMANCE SECTION -->
	<Form.Field {form} name="personalPerformance.performanceRating">
		<Form.Control>
			<Form.Label>Performance Rating</Form.Label>
			<Select.Root type="single" name="personalPerformance.performanceRating" bind:value={$formData.personalPerformance.performanceRating}>
				<Select.Trigger class="w-full">
					{#if $formData.personalPerformance.performanceRating}
						{formattedEnums.PerformanceRating.find(item => item.value === $formData.personalPerformance.performanceRating)?.label}
					{:else}
						Select performance rating
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.PerformanceRating as rating}
						<Select.Item value={rating.value}>{rating.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset {form} name="challengesFaced.challenge" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">Faced Challenges</Form.Legend>
			<Form.Description>
				Select the challenges you encountered during the session
			</Form.Description>
		</div>
		<div class="space-y-2">
			{#each formattedEnums.FacedChallenges as challenge}
				{@const checked = $formData.challengesFaced.challenge.includes(challenge.value)}
				<div class="flex flex-row items-start space-x-3">
					<Form.Control>
						{#snippet children({ props })}
							<Checkbox
								{...props}
								{checked}
								value={challenge.value}
								onCheckedChange={(v) => {
									console.log(`Checked: ${v}, Challenge Value: ${challenge.value}`);
									if (v) {
										addItem(challenge.value, ['challengesFaced', 'challenge']);
									} else {
										removeItem(challenge.value, ['challengesFaced', 'challenge']);
									}
								}}
							/>
							<Form.Label class="font-normal">
								{challenge.label}
							</Form.Label>
						{/snippet}
					</Form.Control>
				</div>
				{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>

	<Form.Field {form} name="personalPerformance.feeling">
		<Form.Control>
			<Form.Label>Overall Feeling</Form.Label>
			<Select.Root type="single" name="personalPerformance.feeling" bind:value={$formData.personalPerformance.feeling}>
				<Select.Trigger class="w-full">
					{#if $formData.personalPerformance.feeling}
						{formattedEnums.OverallFeeling.find(item => item.value === $formData.personalPerformance.feeling)?.label}
					{:else}
						Select overall feeling
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each formattedEnums.OverallFeeling as feeling}
					<Select.Item value={feeling.value}>{feeling.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="personalPerformance.comments">
		<Form.Control>
			<Form.Label>Comments</Form.Label>
			<Textarea.Root name="personalPerformance.comments" bind:value={$formData.personalPerformance.comments} />			
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>


	<!-- MARINE LIFE SECTION -->
	<Form.Fieldset {form} name="marineLife.species" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">Marine Life</Form.Legend>
			<Form.Description>
				Select if you saw any of the following
			</Form.Description>
		</div>
		<div class="space-y-2">
			{#each formattedEnums.MarineLife as specie}
				{@const checked = $formData.marineLife.species.includes(specie.value)}
				<div class="flex flex-row items-start space-x-3">
					<Form.Control>
						{#snippet children({ props })}
							<Checkbox
								{...props}
								{checked}
								value={specie.value}
								onCheckedChange={(v) => {
									if (v) {
										addItem(specie.value, ['marineLife', 'species']);
									} else {
										removeItem(specie.value, ['marineLife', 'species']);
									}
								}}
							/>
							<Form.Label class="font-normal">
								{specie.label}
							</Form.Label>
						{/snippet}
					</Form.Control>
				</div>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>
	
	<button type="submit">Submit Entry</button>
</form>
