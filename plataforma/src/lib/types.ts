export type StatusDemanda = "a_fazer" | "em_andamento" | "em_revisao" | "concluido";

export type TipoDemanda =
  | "trafego_pago"
  | "criativo_video"
  | "criativo_carrossel"
  | "criativo_arte"
  | "copy_estrategia"
  | "sympla_evento"
  | "publicacao_social"
  | "email_marketing"
  | "whatsapp_material"
  | "atendimento"
  | "outro";

export type FuncaoPessoa =
  | "gestao_trafego"
  | "criativos"
  | "publicacao_sympla"
  | "estrategia_copy"
  | "atendimento";

export type Prioridade = "alta" | "media" | "baixa";

export interface Pessoa {
  id: string;
  nome: string;
  email: string;
  funcao: FuncaoPessoa;
  cor: string;
  ativo: boolean;
}

export interface Clube {
  id: string;
  nome: string;
  ativo: boolean;
  sem_organico: boolean;
  tem_app: boolean;
  tem_email_marketing: boolean;
  tem_whatsapp_desconto: boolean;
  tem_collab_clube: boolean;
  link_bio: string | null;
  link_sympla: string | null;
  observacoes: string | null;
}

export interface DemandaTemplate {
  id: string;
  tipo: TipoDemanda;
  titulo_padrao: string;
  descricao_padrao: string | null;
  responsavel_funcao: FuncaoPessoa | null;
  canal: string | null;
  prioridade: Prioridade;
  dias_prazo_apos_seletiva: number;
  aplica_se: keyof Clube | null;
  requer_organico: boolean;
  checklist_padrao: string[];
  ordem: number;
  ativo: boolean;
}

export interface Seletiva {
  id: string;
  clube_id: string;
  mes_referencia: string;
  data_seletiva: string;
}

export interface ChecklistItem {
  id: string;
  demanda_id: string;
  texto: string;
  feito: boolean;
  ordem: number;
}

export interface Demanda {
  id: string;
  titulo: string;
  descricao: string | null;
  tipo: TipoDemanda;
  clube_id: string | null;
  responsavel_id: string | null;
  status: StatusDemanda;
  prioridade: Prioridade;
  canal: string | null;
  prazo: string | null;
  mes_referencia: string;
  criado_em: string;
  atualizado_em: string;
  concluido_em: string | null;
  clube?: Clube | null;
  responsavel?: Pessoa | null;
  checklist_itens?: ChecklistItem[];
}

export const STATUS_LABEL: Record<StatusDemanda, string> = {
  a_fazer: "A Fazer",
  em_andamento: "Em Andamento",
  em_revisao: "Em Revisão",
  concluido: "Concluído",
};

export const FUNCAO_LABEL: Record<FuncaoPessoa, string> = {
  gestao_trafego: "Gestão de Tráfego Pago",
  criativos: "Criativos (Design/Vídeo)",
  publicacao_sympla: "Sympla & Publicação",
  estrategia_copy: "Estratégia & Copy",
  atendimento: "Atendimento",
};

export const TIPO_LABEL: Record<TipoDemanda, string> = {
  trafego_pago: "Tráfego Pago",
  criativo_video: "Vídeo",
  criativo_carrossel: "Carrossel",
  criativo_arte: "Arte estática",
  copy_estrategia: "Estratégia/Copy",
  sympla_evento: "Sympla",
  publicacao_social: "Publicação social",
  email_marketing: "E-mail marketing",
  whatsapp_material: "Material WhatsApp",
  atendimento: "Atendimento",
  outro: "Outro",
};

export const PRIORIDADE_LABEL: Record<Prioridade, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};
