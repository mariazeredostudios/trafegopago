#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GRÊMIO EXPERIENCE — DISNEY CUP 2027
Gerador de vídeo motion design com FFmpeg
Exporta: MP4 editável em CapCut
"""

import subprocess
import json
from datetime import datetime

# ============ CONFIG ============
WIDTH, HEIGHT = 1080, 1920
FPS = 30
DURATION = 40
OUTPUT = '/home/user/trafegopago/gremio_disney_motion.mp4'

# Cores (RGB)
BLACK = "0x000a0a"
WHITE = "0xffffff"
BLUE = "0x0066ff"
YELLOW = "0xffcc00"
RED = "0xff3333"

# ============ SEQUÊNCIAS DE TEXTO ============
sequences = [
    # (tempo_inicio, tempo_duracao, texto, tamanho, cor, posição_y)
    (0, 1, "", 150, WHITE, "h/2"),  # Preto puro
    (1, 1, "E SE...", 180, WHITE, "h/2"),
    (2, 1, "...O PRÓXIMO\\nJOGO", 160, WHITE, "h/2"),
    (3, 1, "FOSSE NOS EUA?", 140, BLUE, "h/2"),
    (4, 1, "ORLANDO 2027\\nDISNEY CUP", 140, WHITE, "h/2"),
    (5, 1, "TORNEIO INTERNACIONAL", 100, WHITE, "h/2"),
    (6, 1, "MAGIC KINGDOM", 130, WHITE, "h/2"),
    (7, 1, "HOLLYWOOD STUDIOS", 130, WHITE, "h/2"),
    (8, 1, "PARQUES AQUÁTICOS", 130, BLUE, "h/2"),
    (9, 1, "TREINAMENTO PROFISSIONAL\\nCOM TÉCNICOS DO GRÊMIO", 85, WHITE, "h/2"),
    (10, 5, "[ESPAÇO PARA VÍDEOS DE AÇÃO]", 80, YELLOW, "h/2"),
    (15, 1, "12 DIAS", 200, YELLOW, "h/2"),
    (16, 1, "JULHO 18–29", 140, WHITE, "h/2"),
    (17, 1, "REPRESENTAR O GRÊMIO", 120, BLUE, "h/2"),
    (18, 2, "[ESPAÇO PARA VÍDEO/IMAGEM]", 100, YELLOW, "h/2"),
    (20, 1, "ISSO NÃO É TURISMO", 140, RED, "h/2"),
    (21, 1, "É FUTEBOL.", 160, BLUE, "h/2"),
    (22, 2, "[ESPAÇO PARA VÍDEO: GOL/COMEMORAÇÃO]", 100, YELLOW, "h/2"),
    (24, 2, "R$ 3.500–5.000", 180, YELLOW, "h/2"),
    (26, 2, "INVESTIMENTO EM SEU FILHO", 100, WHITE, "h/2"),
    (28, 2, "NÃO É GASTO.", 160, YELLOW, "h/2"),
    (30, 2, "É HERANÇA.", 200, WHITE, "h/2"),
    (32, 2, "GREMIOGLOBAL.COM\\nVagas abertas", 120, WHITE, "h/2"),
    (34, 2, "DISNEY CUP 2027", 150, BLUE, "h/2"),
    (36, 4, "GRÊMIO EXPERIENCE", 140, BLUE, "h/2"),
]

# ============ GERADOR FFMPEG ============
def escape_text(text):
    """Escapa caracteres especiais para FFmpeg"""
    replacements = {
        "'": "\\'",
        '"': '\\"',
        ":": "\\:",
        "[": "\\[",
        "]": "\\]",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

def build_drawtext_filter():
    """Constrói filtro complexo de drawtext para FFmpeg"""
    filters = []

    for t_start, duration, text, fontsize, color, y_pos in sequences:
        t_end = t_start + duration

        # Pula textos vazios (para preto)
        if not text.strip():
            continue

        escaped_text = escape_text(text)

        # Parâmetros de drawtext
        drawtext_params = {
            "text": escaped_text,
            "fontsize": fontsize,
            "fontcolor": color,
            "fontfile": "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "x": "(w-text_w)/2",  # Centralizado horizontalmente
            "y": y_pos,
            "alpha": f"if(lt(t\\,{t_start})\\,0\\,if(lt(t\\,{t_start+0.3})\\,(t-{t_start})/0.3\\,if(lt(t\\,{t_end-0.3})\\,1\\,(({t_end}-t)/0.3))))",
            "borderw": "2",
            "bordercolor": "0x000000",
        }

        # Constrói string do drawtext
        params_str = ":".join([f"{k}={v}" for k, v in drawtext_params.items()])
        filters.append(f"drawtext={params_str}")

    return ",".join(filters)

# ============ COMANDO FFMPEG ============
# Cria vídeo preto com textos
filter_chain = build_drawtext_filter()

cmd = [
    'ffmpeg',
    '-f', 'lavfi',
    '-i', f'color=0x000a0a:s={WIDTH}x{HEIGHT}:d={DURATION}',  # Fundo preto
    '-f', 'lavfi',
    '-i', f'anullsrc=r=44100:cl=mono:d={DURATION}',  # Áudio silencioso
    '-vf', filter_chain,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '23',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-y',  # Sobrescreve
    OUTPUT
]

print("🎬 Gerando motion design com FFmpeg...")
print(f"   Resolução: {WIDTH}x{HEIGHT} | Duração: {DURATION}s")
print(f"   Saída: {OUTPUT}\n")

try:
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

    if result.returncode == 0:
        print("✅ Vídeo gerado com sucesso!\n")
        print("📋 PRÓXIMOS PASSOS (CapCut):")
        print("   1. Abra CapCut → Novo Projeto")
        print("   2. Importe: gremio_disney_motion.mp4")
        print("   3. Preencha os espaços:")
        print("      • 10-15s: Vídeos de atletas (treino, chute)")
        print("      • 18-20s: Imagens de Orlando/parques")
        print("      • 22-24s: Vídeo de gol/comemoração")
        print("   4. Adicione áudio:")
        print("      • Trilha 1: Locução (grave com ritmo do roteiro)")
        print("      • Trilha 2: Música cinematográfica (120-140 BPM)")
        print("\n📁 Arquivo:", OUTPUT)
    else:
        print("❌ Erro ao gerar vídeo:")
        print(result.stderr)

except subprocess.TimeoutExpired:
    print("❌ Timeout: FFmpeg levou mais de 5 minutos")
except Exception as e:
    print(f"❌ Erro: {e}")
