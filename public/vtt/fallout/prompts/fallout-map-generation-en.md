# Fallout TTRPG City Map Generator v3.0 (Minimal Map Edition)

## Initial Instructions

Before generating the map, always ask:

**"Which city would you like to map? Please specify the full city name, State/Province, and Country."**

Examples:

* Baltimore, Maryland, USA

* Pittsburgh, Pennsylvania, USA

* Atlanta, Georgia, USA

* Denver, Colorado, USA

Do not proceed until the location has been fully specified.

***

# Objective

Generate a map for a tabletop roleplaying game set in the Fallout universe.

The map must display only:

* geographic features

* major infrastructure

* points of interest (POIs)

* city name

No additional graphical elements should be included.

***

# Mandatory Preliminary Research

Before generating the map:

1. Analyze the real-world geography of the selected location.

2. Consult current satellite and cartographic sources.

3. Use OpenStreetMap, Google Maps, or equivalent sources.

4. Preserve the real-world location of:

   * coastlines

   * rivers

   * lakes

   * bays

   * major elevations

   * valleys

   * railroads

   * highways

   * bridges

   * major districts

5. Identify major landmarks.

6. Preserve the actual placement of infrastructure.

7. Adapt locations into the Fallout universe where appropriate.

The real-world geography must remain immediately recognizable.

***

# Fallout Adaptation

Every POI must originate from:

* an existing real-world structure

* or a location that is plausible for the city

Prefer canonical Fallout organizations and corporations whenever possible:

* Vault-Tec

* RobCo Industries

* Red Rocket

* Poseidon Energy

* General Atomics

* Nuka-Cola

* West Tek

* Corvega

* Med-Tek

* Mass Fusion

Avoid creating locations that conflict with:

* local geography

* local economy

* city size

* urban density

***

# Graphic Style

Generate the map using:

* A4 landscape format

* horizontal orientation

* pure white background

* black linework only

* no colors

* top-down orthographic view

* Fallout-inspired cartographic style

* high readability

* laser-printer friendly design

* strong black-and-white contrast

***

# Allowed Elements

The map may contain only:

* city title

* major roads

* railways

* rivers and waterways

* urban areas

* industrial areas

* natural areas

* numbered POI markers

***

# Forbidden Elements

Do NOT include:

* legends

* coordinate grids

* map coordinates

* scale bars

* compass roses

* information panels

* POI descriptions

* faction lists

* Pip-Boy interface elements

* HUD overlays

* terminal windows

* Vault-Tec decorative frames

* sidebars

* UI components of any kind

***

# POI Density

### Villages (< 5,000 inhabitants)

8–12 POIs

### Small Towns (5,000–25,000 inhabitants)

12–18 POIs

### Medium Cities (25,000–100,000 inhabitants)

18–30 POIs

### Large Cities (100,000–500,000 inhabitants)

30–40 POIs

### Metropolises (>500,000 inhabitants)

40–50 POIs

***

# POI Markers

All POIs must be:

* numbered

* represented by solid black circular markers

* displayed with a white number inside

* clearly readable

* placed according to real-world geography

Markers are the only allowed method of identifying locations.

Do not place text labels next to markers.

***

# Mandatory Geographic Validation

Before completing the map verify that:

* railway stations are located directly on visible rail lines;

* ports are located on navigable waterways or coastlines;

* bridges cross actual rivers, railways, or valleys;

* military installations occupy plausible areas;

* Vaults are placed in geologically plausible locations;

* Fallout corporations replace compatible real-world facilities.

No POI may be placed randomly.

***

# Post-War Damage

Show evidence of the Great War where appropriate:

* collapsed buildings

* devastated neighborhoods

* damaged bridges

* impact craters

* contaminated zones

* military wreckage

* radioactive wasteland areas

Damage must remain consistent with the underlying urban layout.

***

# Deterministic Generation

The map must be generated deterministically.

Create an internal **City Seed** based on:

* city name

* state/province

* country

Example:

`Baltimore_Maryland_USA`

The same City Seed must always produce:

* identical map framing

* identical scale

* identical POI count

* identical POI placement

* identical urban distribution

* identical infrastructure layout

* identical graphic style

Avoid uncontrolled randomness.

Any procedural choice must derive from the City Seed.

***

# Stable POI Assignment

For the same city:

* never change the number of POIs

* never change marker positions

* never change POI categories

* never move existing markers

* never add or remove markers unless explicitly requested

Assign markers in a stable order:

1. city center

2. major infrastructure

3. industrial zones

4. rail infrastructure

5. natural landmarks

6. contaminated areas

7. Vaults and special installations

***

# Stable Map Composition

For the same city always preserve:

* north orientation

* visible geographic extent

* city-to-suburb ratio

* relative position of roads, rivers, railways, and districts

* marker spacing

* marker size

* line thickness

Do not alter framing unless explicitly requested.

***

# Repeatability Verification

Before rendering, verify:

* City Seed matches previous generations;

* urban structure is unchanged;

* marker positions are unchanged;

* POI count is unchanged;

* graphic style is unchanged.

If any unintended differences exist, regenerate the map.

***

# Final Quality Control

Verify that:

* real-world geography is recognizable;

* all markers are present;

* POI count matches city size;

* marker placement is realistic;

* markers do not overlap;

* every POI is geographically plausible.

If any validation fails, regenerate the map.

***

# Final Goal

The map should resemble an authentic post-apocalyptic geographic map from the Fallout universe.

The viewer's attention must focus exclusively on:

* terrain

* infrastructure

* exploration

with no visual clutter or interface elements.

The only visible text on the map should be the city name.
