# Notice for anyone adding icons
Please note that you have to complete the following steps to add a new icon for cards:
- Add the icon SVG here, with the name in the format `<icon_name>_icon.svg`
- Ensure the license on the icon is OK for use in this project, and if required, add a copy of the license into this folder
- If adding an icon from a new source, add a licence header to `scripts/generate_icons.py` for the new icon
- Ensure the icon does NOT have a fill set in the SVG file, as this will interfere with the theme customization
- Run the python script in `scripts/generate_icons.py` to update the packed TS file of icons.
- Update `src/card/index.ts` to add the icon name to the `Icon` type
- Update `components/CardLine.tsx` to add the icon to the dropdown
