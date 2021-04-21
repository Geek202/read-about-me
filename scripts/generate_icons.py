#!/usr/bin/env python3
icon_names = [
    'pronouns',
    'location',
    'star',
    'sadface'
]

lines = []
# python made me do this
new_line = "\n"

for icon in icon_names:
    with open(f'icons/{icon}_icon.svg') as f:
        lines.append(f"    '{icon}': '{f.read().replace(new_line, '')}',")

with open('src/card/icons.ts', 'w') as f:
    f.write("// Icons from Material Design Icons licensed under the Apache 2.0 license (https://www.apache.org/licenses/LICENSE-2.0.html)\n")
    f.write('export default {\n')
    f.write("\n".join(lines))
    f.write('\n}')
    f.write('\n') # trailing newline
