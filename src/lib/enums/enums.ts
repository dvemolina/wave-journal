//Journal Entry Enums
export const SessionType = ["observed", "surfed"] as const;
export const WaveHeight = ["ankle_high", "knee_high", "waist_high", "shoulder_high", "head_high", "over_head", "double_over_head", "triple_over_head", "xxl_dead"] as const;
export const WaveFrequency = ["long_wait", "medium_wait", "short_wait", "constant"] as const;
export const WaveCharacter = ["soft", "medium", "punchy", "serious", "extreme"] as const;
export const WavePeeling = ["left", "right", "a_frame", "mix"] as const;
export const WaveWallShape = ["crumbly", "hollow", "vertical", "varied"] as const;
export const WavePeelSpeed = ["slow_peeling", "fast_peeling", "racy" ] as const;
export const WaveSteepness = ["fat", "mellow", "steep", "radical"] as const;
export const WaveShallowness = ["dry", "shallow", "medium", "deep"] as const;
export const WindDirection = ["off_shore", "on_shore", "cross", "cross_on", "cross_off"] as const;
export const WindConsistency = ["gusty", "steady"] as const;
export const WindStrength = ["none", "light", "moderate", "strong", "severe", "extreme"] as const;
export const CurrentRip = ["none", "light", "moderate", "strong", "severe", "extreme"] as const;
export const RockDanger = ["none", "little", "moderate", "high", "extreme"] as const;
export const TideMovement = ["rising", "falling"] as const;
export const VibeInWater = ["friendly", "chilled", "competitive", "aggressive"] as const;
export const CrowdVolume = ["empty", "light", "moderate", "high", "saturated"] as const;
export const CrowdSkillLevel = ["beginner", "novice", "intermediate", "advanced", "expert", "pros"] as const;
export const OverallFeeling = ["angry", "frustrated", "nervous", "neutral", "content", "satisfied", "stoked"] as const;
export const WaterQuality = ["pristine", "clean", "muddy", "dirty", "polluted"] as const;
export const WaterSurface = ["glassy", "normal", "groomed", "messy"] as const;
export const FacedChallenges = ["paddling_out", "positioning", "take_off", "wave_rhythm", "wave_selection", "maneuvers"] as const;
export const MarineLife = ["dolphins", "jelly_fish", "urchins", "sharks", "seals", "algae"] as const;
export const WetsuitThickness = ["shorts", "lycra_or_shirt", "2/2", "3/2", "3/3", "4/3", "5/4", "+5"] as const;
export const PerformanceRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
//Breaks Enums
export const BreakType = ["point", "reef", "beach", "river_mouth", "river", "lake", "artificial"] as const;

//Others
export const CardinalPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"] as const;
export const YearSeason = ["winter", "spring", "summer", "autumn", "all_year"] as const;

