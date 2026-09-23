#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GRÊMIO EXPERIENCE — DISNEY CUP 2027
Motion Design Video Generator (40 segundos)
Saída: MP4 pronto para CapCut (adicione imagens/vídeos conforme necessário)
"""

from moviepy.editor import (
    VideoClip, CompositeVideoClip, TextClip, ColorClip,
    concatenate_videoclips, CompositeAudioClip
)
from moviepy.video.compositing.transitions import crossfadeout, crossfadein
import numpy as np
from PIL import Image, ImageDraw
import os

# ============ CONFIG ============
WIDTH, HEIGHT = 1080, 1920  # Vertical (9:16 para IG Reels)
FPS = 30
DURATION = 40

# Cores
BLACK = (10, 10, 10)
WHITE = (255, 255, 255)
BLUE_GREMIO = (0, 102, 255)  # #0066FF
BLUE_GREMIO_LIGHT = (0, 153, 255)  # #0099FF
YELLOW = (255, 204, 0)  # #FFCC00
RED = (255, 51, 51)  # #FF3333

# ============ FUNÇÕES ============

def make_text_clip(text, fontsize, color, duration, t_start, t_end, effect=None):
    """Cria clipe de texto com animação de entrada/saída"""
    clip = TextClip(
        text,
        fontsize=fontsize,
        font='Arial-Bold',
        color=color,
        method='caption',
        size=(WIDTH * 0.9, None),
        align='center'
    )
    clip = clip.set_duration(duration)
    clip = clip.set_position('center')

    # Animações de entrada
    if effect == 'scale_up':
        clip = clip.resize(lambda t: max(0.1, min(1.0, 1 + (t / 0.8) * 0.3)))
    elif effect == 'fade_in':
        clip = clip.set_opacity(lambda t: min(1.0, t / 0.5))
    elif effect == 'slide_up':
        clip = clip.set_position(lambda t: ('center', HEIGHT * 0.5 + (1 - min(1.0, t / 0.6)) * 200))

    return clip.set_start(t_start)

def make_color_clip(color, duration, t_start):
    """Cria clipe de cor sólida"""
    return ColorClip(size=(WIDTH, HEIGHT), color=color).set_duration(duration).set_start(t_start)

def make_animated_text(text, fontsize, color, duration, t_start, scale_factor=1.3):
    """Texto que entra com scale effect (explode)"""
    clip = TextClip(
        text,
        fontsize=fontsize,
        font='Arial-Bold',
        color=color,
        method='caption',
        size=(WIDTH * 0.95, None),
        align='center'
    )
    clip = clip.set_duration(duration)
    clip = clip.set_position('center')

    # Efeito: começa pequeno (0.3x), cresce pra 1.3x, volta pra 1.0x
    def scale(t):
        if t < 0.15:  # Primeiros 150ms: explode
            return 0.3 + (t / 0.15) * scale_factor
        elif t < 0.3:  # Próximos 150ms: estabiliza
            return min(1.3, 0.3 + scale_factor + (t - 0.15) / 0.15 * (1.0 - scale_factor))
        return 1.0

    clip = clip.resize(scale)
    return clip.set_start(t_start)

# ============ SEQUÊNCIA 0-1s: PRETO ============
seg_0_1 = make_color_clip(BLACK, 1, 0)

# ============ SEQUÊNCIA 1-2s: "E SE..." ============
seg_1_2_bg = make_color_clip(BLACK, 1, 1)
seg_1_2_text = make_animated_text("E SE...", fontsize=180, color=WHITE, duration=1, t_start=1)

# ============ SEQUÊNCIA 2-3s: "...O PRÓXIMO JOGO" ============
seg_2_3_bg = make_color_clip(BLACK, 1, 2)
seg_2_3_text = make_animated_text("...O PRÓXIMO\nJOGO", fontsize=160, color=WHITE, duration=1, t_start=2)

# ============ SEQUÊNCIA 3-4s: "FOSSE NOS EUA?" ============
seg_3_4_bg = make_color_clip(BLACK, 1, 3)
seg_3_4_text = make_animated_text("FOSSE NOS EUA?", fontsize=140, color=BLUE_GREMIO, duration=1, t_start=3)

# ============ SEQUÊNCIA 4-5s: "ORLANDO 2027" + "DISNEY CUP" ============
seg_4_5_bg = make_color_clip(BLACK, 1, 4)
seg_4_5_title = TextClip(
    "ORLANDO 2027",
    fontsize=160,
    font='Arial-Bold',
    color=BLUE_GREMIO,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position(('center', HEIGHT * 0.35)).set_start(4)

seg_4_5_sub = TextClip(
    "DISNEY CUP",
    fontsize=120,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position(('center', HEIGHT * 0.55)).set_opacity(lambda t: min(1.0, t / 0.3)).set_start(4)

# ============ SEQUÊNCIA 5-6s: "TORNEIO INTERNACIONAL" ============
seg_5_6_bg = make_color_clip(BLACK, 1, 5)
seg_5_6_text = TextClip(
    "TORNEIO INTERNACIONAL",
    fontsize=100,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(5)

# ============ SEQUÊNCIA 6-8s: PARQUES (3 textos rápidos) ============
seg_6_7_bg = make_color_clip(BLACK, 1, 6)
seg_6_7_text = TextClip(
    "MAGIC KINGDOM",
    fontsize=130,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_opacity(lambda t: 1.0 if t < 0.8 else max(0, 1 - (t - 0.8) / 0.2)).set_start(6)

seg_7_8_bg = make_color_clip(BLACK, 1, 7)
seg_7_8_text = TextClip(
    "HOLLYWOOD STUDIOS",
    fontsize=130,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(7)

seg_8_9_bg = make_color_clip(BLACK, 1, 8)
seg_8_9_text = TextClip(
    "PARQUES AQUÁTICOS",
    fontsize=130,
    font='Arial-Bold',
    color=BLUE_GREMIO_LIGHT,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(8)

# ============ SEQUÊNCIA 9-10s: "TREINAMENTO PROFISSIONAL" ============
seg_9_10_bg = make_color_clip(BLACK, 1, 9)
seg_9_10_text = TextClip(
    "TREINAMENTO PROFISSIONAL\nCOM TÉCNICOS DO GRÊMIO",
    fontsize=85,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(9)

# ============ SEQUÊNCIA 10-15s: PAUSA (espaço para vídeos de ação) ============
seg_10_15_bg = make_color_clip(BLACK, 5, 10)

# ============ SEQUÊNCIA 15-16s: "12 DIAS" (PULSE) ============
seg_15_16_bg = make_color_clip(BLACK, 1, 15)
seg_15_16_text = TextClip(
    "12 DIAS",
    fontsize=200,
    font='Arial-Bold',
    color=YELLOW,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center')

def pulse_scale(t):
    # Pulse 3x: normal -> 1.1x -> normal -> 1.1x -> normal -> 1.1x -> normal
    cycle = t % 0.33
    return 1.0 + 0.15 * np.sin(cycle * np.pi * 6)

seg_15_16_text = seg_15_16_text.resize(pulse_scale).set_start(15)

# ============ SEQUÊNCIA 16-17s: "JULHO 18-29" ============
seg_16_17_bg = make_color_clip(BLACK, 1, 16)
seg_16_17_text = TextClip(
    "JULHO 18–29",
    fontsize=140,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_opacity(lambda t: min(1.0, t / 0.4)).set_start(16)

# ============ SEQUÊNCIA 17-18s: "REPRESENTAR O GRÊMIO" ============
seg_17_18_bg = make_color_clip(BLACK, 1, 17)
seg_17_18_text = TextClip(
    "REPRESENTAR O GRÊMIO",
    fontsize=120,
    font='Arial-Bold',
    color=BLUE_GREMIO,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(17)

# ============ SEQUÊNCIA 18-20s: ESPAÇO PARA VÍDEOS ============
seg_18_20_bg = make_color_clip(BLACK, 2, 18)

# ============ SEQUÊNCIA 20-22s: "ISSO NÃO É TURISMO" + "É FUTEBOL" ============
seg_20_21_bg = make_color_clip(BLACK, 1, 20)
seg_20_21_text = TextClip(
    "ISSO NÃO É TURISMO",
    fontsize=140,
    font='Arial-Bold',
    color=RED,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(20)

seg_21_22_bg = make_color_clip(BLACK, 1, 21)
seg_21_22_text = TextClip(
    "É FUTEBOL.",
    fontsize=160,
    font='Arial-Bold',
    color=BLUE_GREMIO,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(1).set_position('center').set_start(21)

# ============ SEQUÊNCIA 22-24s: ESPAÇO PARA VÍDEOS DE GOLS ============
seg_22_24_bg = make_color_clip(BLACK, 2, 22)

# ============ SEQUÊNCIA 24-26s: "R$ 3.500–5.000" ============
seg_24_26_bg = make_color_clip(BLACK, 2, 24)
seg_24_26_text = TextClip(
    "R$ 3.500–5.000",
    fontsize=180,
    font='Arial-Bold',
    color=YELLOW,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position(('center', HEIGHT * 0.4))

def cascade_drop(t):
    # Texto cai verticamente com rotação
    drop_speed = t * 100
    return 1.0 if t < 0.1 else (1.0 - (t - 0.1) * 0.1)

seg_24_26_text = seg_24_26_text.set_position(lambda t: ('center', HEIGHT * 0.3 + min(200, t * 150))).set_start(24)

# ============ SEQUÊNCIA 26-28s: "INVESTIMENTO EM SEU FILHO" ============
seg_26_28_bg = make_color_clip(BLACK, 2, 26)
seg_26_28_text = TextClip(
    "INVESTIMENTO EM SEU FILHO",
    fontsize=100,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position('center').set_opacity(lambda t: min(1.0, t / 0.4) if t < 1 else max(0, 1 - (t - 1) / 0.4)).set_start(26)

# ============ SEQUÊNCIA 28-30s: "NÃO É GASTO." ============
seg_28_30_bg = make_color_clip(BLACK, 2, 28)
seg_28_30_text = TextClip(
    "NÃO É GASTO.",
    fontsize=160,
    font='Arial-Bold',
    color=YELLOW,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position('center').set_start(28)

# ============ SEQUÊNCIA 30-32s: "É HERANÇA." ============
seg_30_32_bg = make_color_clip(BLACK, 2, 30)
seg_30_32_text = make_animated_text("É HERANÇA.", fontsize=200, color=WHITE, duration=2, t_start=30, scale_factor=0.5)

# ============ SEQUÊNCIA 32-34s: PRETO + "GREMIOGLOBAL.COM" ============
seg_32_34_bg = make_color_clip(BLACK, 2, 32)
seg_32_34_text = TextClip(
    "GREMIOGLOBAL.COM",
    fontsize=130,
    font='Arial-Bold',
    color=WHITE,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position(('center', HEIGHT * 0.45)).set_opacity(lambda t: min(1.0, t / 0.3)).set_start(32)

seg_32_34_subtext = TextClip(
    "Vagas abertas",
    fontsize=80,
    font='Arial',
    color=BLUE_GREMIO_LIGHT,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position(('center', HEIGHT * 0.60)).set_opacity(lambda t: min(1.0, (t - 0.5) / 0.3) if t > 0.5 else 0).set_start(32)

# ============ SEQUÊNCIA 34-36s: "DISNEY CUP 2027" ============
seg_34_36_bg = make_color_clip(BLACK, 2, 34)
seg_34_36_text = TextClip(
    "DISNEY CUP 2027",
    fontsize=150,
    font='Arial-Bold',
    color=BLUE_GREMIO,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(2).set_position(('center', HEIGHT * 0.45)).set_start(34)

# ============ SEQUÊNCIA 36-40s: "GRÊMIO EXPERIENCE" + FADE ============
seg_36_40_bg = make_color_clip(BLACK, 4, 36)
seg_36_40_text = TextClip(
    "GRÊMIO EXPERIENCE",
    fontsize=140,
    font='Arial-Bold',
    color=BLUE_GREMIO,
    method='caption',
    size=(WIDTH * 0.9, None),
    align='center'
).set_duration(4).set_position(('center', HEIGHT * 0.5)).set_opacity(lambda t: 1.0 if t < 2.5 else max(0, 1 - (t - 2.5) / 1.5)).set_start(36)

# ============ COMPOSIÇÃO FINAL ============
clips = [
    seg_0_1,
    seg_1_2_bg, seg_1_2_text,
    seg_2_3_bg, seg_2_3_text,
    seg_3_4_bg, seg_3_4_text,
    seg_4_5_bg, seg_4_5_title, seg_4_5_sub,
    seg_5_6_bg, seg_5_6_text,
    seg_6_7_bg, seg_6_7_text,
    seg_7_8_bg, seg_7_8_text,
    seg_8_9_bg, seg_8_9_text,
    seg_9_10_bg, seg_9_10_text,
    seg_10_15_bg,
    seg_15_16_bg, seg_15_16_text,
    seg_16_17_bg, seg_16_17_text,
    seg_17_18_bg, seg_17_18_text,
    seg_18_20_bg,
    seg_20_21_bg, seg_20_21_text,
    seg_21_22_bg, seg_21_22_text,
    seg_22_24_bg,
    seg_24_26_bg, seg_24_26_text,
    seg_26_28_bg, seg_26_28_text,
    seg_28_30_bg, seg_28_30_text,
    seg_30_32_bg, seg_30_32_text,
    seg_32_34_bg, seg_32_34_text, seg_32_34_subtext,
    seg_34_36_bg, seg_34_36_text,
    seg_36_40_bg, seg_36_40_text,
]

# Composição
video = CompositeVideoClip(clips, size=(WIDTH, HEIGHT))
video = video.set_duration(DURATION)

# Exporta
output_file = '/home/user/trafegopago/gremio_disney_motion.mp4'
print(f"🎬 Gerando vídeo: {output_file}")
print(f"   Resolução: {WIDTH}x{HEIGHT} | Duração: {DURATION}s | FPS: {FPS}")

video.write_videofile(
    output_file,
    fps=FPS,
    codec='libx264',
    audio=False,  # Sem áudio por enquanto (adicione depois em CapCut)
    preset='medium',
    verbose=False,
    logger=None
)

print(f"\n✅ Vídeo pronto! Abra em CapCut e adicione:")
print("   • Imagens/vídeos nas sequências de 10-15s, 18-20s, 22-24s")
print("   • Áudio: locução + música de fundo")
print(f"\n📁 Arquivo: {output_file}")
