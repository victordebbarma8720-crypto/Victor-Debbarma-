#!/usr/bin/env python3
"""
Generate Tripura Heritage PWA icons using pure Python (struct + zlib).
Creates icon-192.png and icon-512.png with TH branding.
"""

import struct
import zlib
import os

def make_png(width, height, pixels):
    """
    Create a PNG file from a list of (R, G, B, A) pixel tuples.
    pixels is a flat list of tuples, row-major order.
    Returns bytes.
    """
    def chunk(name, data):
        c = name + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)

    # PNG signature
    sig = b'\x89PNG\r\n\x1a\n'

    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    # color type 2 = RGB (we'll use RGBA with color type 6)
    ihdr_data = struct.pack('>II', width, height) + bytes([8, 6, 0, 0, 0])
    ihdr = chunk(b'IHDR', ihdr_data)

    # Build raw image data (RGBA)
    raw_rows = []
    for y in range(height):
        row = bytearray()
        for x in range(width):
            r, g, b, a = pixels[y * width + x]
            row += bytes([r, g, b, a])
        raw_rows.append(bytes([0]) + bytes(row))  # filter type 0 (none)

    raw = b''.join(raw_rows)
    compressed = zlib.compress(raw, 9)
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')

    return sig + ihdr + idat + iend


def lerp(a, b, t):
    return int(a + (b - a) * t)


def lerp_color(c1, c2, t):
    return tuple(lerp(a, b, t) for a, b in zip(c1, c2))


def clamp(v, lo=0, hi=255):
    return max(lo, min(hi, v))


def generate_icon(size, output_path):
    """Generate a TH branded icon at the given size."""
    pixels = []

    # Brand colors
    gold = (200, 134, 10)
    gold_light = (229, 160, 32)
    maroon = (139, 26, 26)
    maroon_dark = (100, 15, 15)
    white = (255, 255, 255)

    cx = size / 2
    cy = size / 2
    radius = size * 0.42
    corner_r = size * 0.18

    for y in range(size):
        row = []
        for x in range(size):
            nx = x - cx
            ny = y - cy

            # Rounded rectangle mask
            rx = abs(nx) - (radius - corner_r)
            ry = abs(ny) - (radius - corner_r)
            in_rect = abs(nx) <= radius and abs(ny) <= radius
            in_corner = rx > 0 and ry > 0
            if in_corner:
                dist = (rx * rx + ry * ry) ** 0.5
                in_shape = dist <= corner_r
            else:
                in_shape = in_rect

            if not in_shape:
                row.append((0, 0, 0, 0))
                continue

            # Radial gradient background: gold center → maroon edges
            dist_from_center = (nx * nx + ny * ny) ** 0.5
            t = min(dist_from_center / (radius * 1.1), 1.0)
            # Slightly non-linear
            t2 = t * t

            bg = lerp_color(gold_light, maroon_dark, t2)

            # Add warm overlay in upper-left
            ul_factor = max(0, (1 - (x / size * 1.5)) * (1 - (y / size * 1.5)))
            bg = (
                clamp(int(bg[0] + ul_factor * 40)),
                clamp(int(bg[1] + ul_factor * 15)),
                clamp(int(bg[2]))
            )

            # Anti-aliased edge
            if in_corner:
                alpha = clamp(int(255 * (1 - max(0, dist - corner_r + 1.5))))
            else:
                alpha = 255

            # Soft inner glow at center
            glow_t = max(0, 1 - dist_from_center / (radius * 0.5))
            glow = int(glow_t * glow_t * 25)
            bg = (clamp(bg[0] + glow), clamp(bg[1] + glow // 3), clamp(bg[2]))

            # --- Draw "TH" text ---
            # Scale letter coordinates to icon size
            # Reference: designed at 192px, scale factor:
            scale = size / 192.0

            # Letter stroke width
            sw = max(2, int(10 * scale))
            sw_thin = max(1, int(7 * scale))

            # Center the "TH" text
            # T: top-left at (52, 68) → width=40, height=60
            # H: top-left at (98, 68) → width=40, height=60
            # (reference coords at 192px)

            # Normalize to 192px coordinate space
            px192 = x / scale
            py192 = y / scale

            # "T" letter bounds
            t_left = 44
            t_right = 92
            t_top = 64
            t_mid = 76
            t_bot = 128
            t_cx = (t_left + t_right) / 2

            # "H" letter bounds
            h_left = 100
            h_right = 148
            h_top = 64
            h_mid_top = 90
            h_mid_bot = 102
            h_bot = 128

            in_letter = False

            # T — horizontal bar
            if (t_top <= py192 <= t_top + (t_mid - t_top) and
                    t_left <= px192 <= t_right):
                in_letter = True

            # T — vertical bar
            if (t_top <= py192 <= t_bot and
                    t_cx - sw_thin / 2 <= px192 <= t_cx + sw_thin / 2):
                in_letter = True

            # H — left vertical
            if (h_top <= py192 <= h_bot and
                    h_left <= px192 <= h_left + sw_thin):
                in_letter = True

            # H — right vertical
            if (h_top <= py192 <= h_bot and
                    h_right - sw_thin <= px192 <= h_right):
                in_letter = True

            # H — crossbar
            if (h_mid_top <= py192 <= h_mid_bot and
                    h_left <= px192 <= h_right):
                in_letter = True

            if in_letter:
                # White with slight gold tint
                letter_color = (255, 248, 230)
                row.append((letter_color[0], letter_color[1], letter_color[2], alpha))
            else:
                row.append((bg[0], bg[1], bg[2], alpha))

        pixels.extend(row)

    png_data = make_png(size, size, pixels)
    with open(output_path, 'wb') as f:
        f.write(png_data)
    print(f"Generated: {output_path} ({len(png_data)} bytes)")


if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(base_dir, 'icons')
    os.makedirs(icons_dir, exist_ok=True)

    generate_icon(192, os.path.join(icons_dir, 'icon-192.png'))
    generate_icon(512, os.path.join(icons_dir, 'icon-512.png'))

    print("Done! Icons generated in:", icons_dir)
