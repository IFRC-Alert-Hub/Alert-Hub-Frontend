import axios from "axios";
import { GetAlertInfoByAlertID } from "../../../APIs/Alert-Manager-API/AlertInfo";
import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  id: 941824,
  url: "https://apiprevmet3.inmet.gov.br/avisos/rss/44474",
  identifier: "urn:oid:2.49.0.0.76.0.2023.20926.2",
  sender: "info.aviso@inmet.gov.br",
  sent: "2023-08-24 06:00:00+00:00",
  status: "Actual",
  msg_type: "Cancel",
  source: "",
  scope: "Public",
  restriction: "",
  addresses: "",
  code: "",
  note: "",
  references:
    "info.aviso@inmet.gov.br,urn:oid:2.49.0.0.76.0.2023.20926.1,2023-08-24T03:00:00-03:00",
  incidents: "",
  region: "Americas",
  country: "Brazil",
  admin1: [
    "Maranhao",
    "Ceara",
    "Piaui",
    "Pernambuco",
    "Tocantins",
    "Bahia",
    "Goias",
    "Minas Gerais",
  ],
  info: [
    {
      id: 753823,
      language: "pt-BR",
      category: "Met",
      event: "Onda de Calor",
      response_type: "Prepare",
      urgency: "Future",
      severity: "Severe",
      certainty: "Likely",
      audience: "",
      event_code: "",
      effective: "2023-08-24 06:00:00+00:00",
      onset: "2023-08-24 15:00:00+00:00",
      expires: "2023-08-28 21:00:00+00:00",
      sender_name: "Instituto Nacional de Meteorologia",
      headline: "Aviso de Onda de Calor. Severidade Grau: Severe",
      description:
        "INMET publica aviso iniciando em: 24/08/2023 12:00. Risco à saúde. Temperatura 5ºC acima da média por período de 03 até 05 dias.",
      instruction: "Contate a Defesa Civil (telefone: 199).",
      web: "https://alertas2.inmet.gov.br/44474",
      contact:
        "INMET - Eixo Monumental Sul Via S1 - Sudoeste - Brasília-DF (61) 2102-4700",
      parameter: [
        {
          id: 1350045,
          value_name: "ColorRisk",
          value: "#F96602",
        },
        {
          id: 1350046,
          value_name: "TimeStampDateOnSet",
          value: "1692889200",
        },
        {
          id: 1350047,
          value_name: "TimeStampDateExpires",
          value: "1693256400",
        },
        {
          id: 1350048,
          value_name: "Municipios",
          value:
            "Abaré - BA (2900207), Acauã - PI (2200053), Afrânio - PE (2600203), Agricolândia - PI (2200103), Água Branca - PI (2200202), Aiuaba - CE (2300408), Alagoinha do Piauí - PI (2200251), Alegrete do Piauí - PI (2200277), Alto Longá - PI (2200301), Alto Parnaíba - MA (2100501), Altos - PI (2200400), Alvorada do Gurguéia - PI (2200459), Amarante - PI (2200509), Angical - BA (2901403), Angical do Piauí - PI (2200608), Anísio de Abreu - PI (2200707), Antônio Almeida - PI (2200806), Araripe - CE (2301307), Araripina - PE (2601102), Aroazes - PI (2200905), Aroeiras do Itaim - PI (2200954), Arraial - PI (2201002), Assunção do Piauí - PI (2201051), Aurora do Tocantins - TO (1702703), Avelino Lopes - PI (2201101), Baianópolis - BA (2902500), Baixa Grande do Ribeiro - PI (2201150), Barão de Grajaú - MA (2101509), Barra - BA (2902708), Barra D'Alcântara - PI (2201176), Barras - PI (2201200), Barreiras - BA (2903201), Barreiras do Piauí - PI (2201309), Barro Duro - PI (2201408), Batalha - PI (2201507), Bela Vista do Piauí - PI (2201556), Belém do Piauí - PI (2201572), Belém do São Francisco - PE (2601607), Beneditinos - PI (2201606), Benedito Leite - MA (2101806), Bertolínia - PI (2201705), Betânia do Piauí - PI (2201739), Boa Hora - PI (2201770), Bocaina - PI (2201804), Bodocó - PE (2602001), Bom Jesus - PI (2201903), Bonfim do Piauí - PI (2201929), Bonito de Minas - MG (3108255), Boqueirão do Piauí - PI (2201945), Brasileira - PI (2201960), Brejo do Piauí - PI (2201988), Brejolândia - BA (2904407), Buriti Bravo - MA (2102309), Buriti dos Montes - PI (2202026), Buritirama - BA (2904753), Cabeceiras do Piauí - PI (2202059), Cabrobó - PE (2603009), Cajazeiras do Piauí - PI (2202075), Caldeirão Grande do Piauí - PI (2202091), Campinas do Piauí - PI (2202109), Campo Alegre de Lourdes - BA (2905909), Campo Alegre do Fidalgo - PI (2202117), Campo Formoso - BA (2906006), Campo Grande do Piauí - PI (2202133), Campo Maior - PI (2202208), Campos Belos - GO (5204904), Campos Sales - CE (2302701), Canápolis - BA (2906105), Canavieira - PI (2202251), Canto do Buriti - PI (2202307), Capitão de Campos - PI (2202406), Capitão Gervásio Oliveira - PI (2202455), Caracol - PI (2202505), Caridade do Piauí - PI (2202554), Carinhanha - BA (2907103), Casa Nova - BA (2907202), Castelo do Piauí - PI (2202604), Catolândia - BA (2907400), Caxias - MA (2103000), Cocal de Telha - PI (2202711), Cocos - BA (2908101), Coivaras - PI (2202737), Colinas - MA (2103505), Colônia do Gurguéia - PI (2202752), Colônia do Piauí - PI (2202778), Conceição do Canindé - PI (2202802), Coribe - BA (2909109), Coronel José Dias - PI (2202851), Corrente - PI (2202901), Correntina - BA (2909307), Cotegipe - BA (2909406), Crateús - CE (2304103), Cristalândia do Piauí - PI (2203008), Cristino Castro - PI (2203107), Cristópolis - BA (2909703), Curaçá - BA (2909901), Curimatá - PI (2203206), Currais - PI (2203230), Curralinhos - PI (2203255), Curral Novo do Piauí - PI (2203271), Demerval Lobão - PI (2203305), Dianópolis - TO (1707009), Dirceu Arcoverde - PI (2203354), Dom Expedito Lopes - PI (2203404), Domingos Mourão - PI (2203420), Dom Inocêncio - PI (2203453), Dormentes - PE (2605152), Elesbão Veloso - PI (2203503), Eliseu Martins - PI (2203602), Exu - PE (2605301), Fartura do Piauí - PI (2203750), Feira da Mata - BA (2910776), Flores do Piauí - PI (2203800), Floresta do Piauí - PI (2203859), Floriano - PI (2203909), Formosa do Rio Preto - BA (2911105), Formoso - MG (3126208), Fortuna - MA (2104206), Francinópolis - PI (2204006), Francisco Ayres - PI (2204105), Francisco Macedo - PI (2204154), Francisco Santos - PI (2204204), Fronteiras - PI (2204303), Geminiano - PI (2204352), Gentio do Ouro - BA (2911303), Gilbués - PI (2204402), Governador Eugênio Barros - MA (2104602), Granito - PE (2606309), Guadalupe - PI (2204501), Guaribas - PI (2204550), Hugo Napoleão - PI (2204600), Ibotirama - BA (2913200), Inhuma - PI (2204709), Ipiranga do Piauí - PI (2204808), Ipubi - PE (2607307), Isaías Coelho - PI (2204907), Itaguaçu da Bahia - BA (2915353), Itainópolis - PI (2205003), Itaueira - PI (2205102), Jaborandi - BA (2917359), Jacobina do Piauí - PI (2205151), Jaicós - PI (2205201), Jardim do Mulato - PI (2205250), Jatobá - MA (2105450), Jatobá do Piauí - PI (2205276), Jerumenha - PI (2205300), João Costa - PI (2205359), José de Freitas - PI (2205508), Juazeiro - BA (2918407), Juazeiro do Piauí - PI (2205516), Júlio Borges - PI (2205524), Jurema - PI (2205532), Juvenília - MG (3136959), Lagoa Alegre - PI (2205557), Lagoa de São Francisco - PI (2205573), Lagoa do Barro do Piauí - PI (2205565), Lagoa do Mato - MA (2105922), Lagoa do Piauí - PI (2205581), Lagoa do Sítio - PI (2205599), Lagoa Grande - PE (2608750), Lagoinha do Piauí - PI (2205540), Landri Sales - PI (2205607), Lavandeira - TO (1712157), Loreto - MA (2106102), Luís Eduardo Magalhães - BA (2919553), Mambaí - GO (5212709), Manoel Emídio - PI (2205904), Mansidão - BA (2920452), Marcolândia - PI (2205953), Marcos Parente - PI (2206001), Massapê do Piauí - PI (2206050), Mateiros - TO (1712702), Matões - MA (2106607), Miguel Alves - PI (2206209), Miguel Leão - PI (2206308), Milton Brandão - PI (2206357), Mirador - MA (2106706), Monsenhor Gil - PI (2206407), Monsenhor Hipólito - PI (2206506), Montalvânia - MG (3142700), Monte Alegre do Piauí - PI (2206605), Moreilândia - PE (2614303), Morpará - BA (2921609), Morro Cabeça no Tempo - PI (2206654), Muquém do São Francisco - BA (2922250), Nazaré do Piauí - PI (2206704), Nazária - PI (2206720), Nossa Senhora de Nazaré - PI (2206753), Nova Iorque - MA (2107308), Nova Santa Rita - PI (2207959), Novo Jardim - TO (1715259), Novo Oriente do Piauí - PI (2206902), Novo Santo Antônio - PI (2206951), Oeiras - PI (2207009), Olho D'Água do Piauí - PI (2207108), Orocó - PE (2609808), Ouricuri - PE (2609907), Padre Marcos - PI (2207207), Paes Landim - PI (2207306), Pajeú do Piauí - PI (2207355), Palmeira do Piauí - PI (2207405), Palmeirais - PI (2207504), Paquetá - PI (2207553), Paraibano - MA (2107704), Parambu - CE (2310308), Parnaguá - PI (2207603), Parnamirim - PE (2610400), Parnarama - MA (2107803), Passagem Franca - MA (2107902), Passagem Franca do Piauí - PI (2207751), Pastos Bons - MA (2108009), Patos do Piauí - PI (2207777), Pau D'Arco do Piauí - PI (2207793), Paulistana - PI (2207801), Pavussu - PI (2207850), Pedro II - PI (2207900), Pedro Laurentino - PI (2207934), Petrolina - PE (2611101), Picos - PI (2208007), Pilão Arcado - BA (2924405), Pimenteiras - PI (2208106), Pio IX - PI (2208205), Piracuruca - PI (2208304), Piripiri - PI (2208403), Ponte Alta do Bom Jesus - TO (1717800), Poranga - CE (2311009), Porto Alegre do Piauí - PI (2208551), Posse - GO (5218300), Prata do Piauí - PI (2208601), Queimada Nova - PI (2208650), Quiterianópolis - CE (2311264), Redenção do Gurguéia - PI (2208700), Regeneração - PI (2208809), Remanso - BA (2926004), Riachão das Neves - BA (2926202), Riacho Frio - PI (2208858), Ribeira do Piauí - PI (2208874), Ribeiro Gonçalves - PI (2208908), Rio Grande do Piauí - PI (2209005), Salgueiro - PE (2612208), Salitre - CE (2311959), Santa Cruz - PE (2612455), Santa Cruz do Piauí - PI (2209104), Santa Cruz dos Milagres - PI (2209153), Santa Filomena - PE (2612554), Santa Filomena - PI (2209203), Santa Luz - PI (2209302), Santa Maria da Boa Vista - PE (2612604), Santa Maria da Vitória - BA (2928109), Santana - BA (2928208), Santana do Piauí - PI (2209351), Santa Rita de Cássia - BA (2928406), Santa Rosa do Piauí - PI (2209377), Santo Antônio de Lisboa - PI (2209401), Santo Antônio dos Milagres - PI (2209450), Santo Inácio do Piauí - PI (2209500), São Braz do Piauí - PI (2209559), São Desidério - BA (2928901), São Domingos - GO (5219803), São Domingos do Azeitão - MA (2110658), São Félix de Balsas - MA (2110807), São Félix do Coribe - BA (2929057), São Félix do Piauí - PI (2209609), São Francisco de Assis do Piauí - PI (2209658), São Francisco do Maranhão - MA (2110906), São Francisco do Piauí - PI (2209708), São Gonçalo do Gurguéia - PI (2209757), São Gonçalo do Piauí - PI (2209807), São João da Canabrava - PI (2209856), São João da Serra - PI (2209906), São João da Varjota - PI (2209955), São João do Piauí - PI (2210003), São João dos Patos - MA (2111102), São José do Peixe - PI (2210102), São José do Piauí - PI (2210201), São Julião - PI (2210300), São Lourenço do Piauí - PI (2210359), São Luis do Piauí - PI (2210375), São Miguel da Baixa Grande - PI (2210383), São Miguel do Fidalgo - PI (2210391), São Miguel do Tapuio - PI (2210409), São Pedro do Piauí - PI (2210508), São Raimundo Nonato - PI (2210607), Sebastião Barros - PI (2210623), Sebastião Leal - PI (2210631), Sento Sé - BA (2930204), Serra do Ramalho - BA (2930154), Serra Dourada - BA (2930303), Serrita - PE (2614006), Sigefredo Pacheco - PI (2210656), Simões - PI (2210706), Simplício Mendes - PI (2210805), Sobradinho - BA (2930774), Socorro do Piauí - PI (2210904), Sucupira do Norte - MA (2111904), Sucupira do Riachão - MA (2111953), Sussuapara - PI (2210938), Tabocas do Brejo Velho - BA (2930907), Taguatinga - TO (1720903), Tamboril do Piauí - PI (2210953), Tanque do Piauí - PI (2210979), Tasso Fragoso - MA (2112001), Teresina - PI (2211001), Terra Nova - PE (2615201), Timon - MA (2112209), Trindade - PE (2615607), União - PI (2211100), Uruçuí - PI (2211209), Valença do Piauí - PI (2211308), Várzea Branca - PI (2211357), Várzea Grande - PI (2211407), Vera Mendes - PI (2211506), Vila Nova do Piauí - PI (2211605), Wall Ferraz - PI (2211704), Wanderley - BA (2933455), Xique-Xique - BA (2933604)",
        },
        {
          id: 1350049,
          value_name: "Estados",
          value:
            "Bahia, Piauí, Pernambuco, Ceará, Maranhão, Tocantins, Minas Gerais, Goiás",
        },
      ],
      area: [
        {
          id: 1931095,
          area_desc:
            "Aviso para as áreas: Vale São-Franciscano da Bahia, Sudeste Piauiense, São Francisco Pernambucano, Centro-Norte Piauiense, Sertões Cearenses, Sul Maranhense, Sudoeste Piauiense, Extremo Oeste Baiano, Sul Cearense, Sertão Pernambucano, Oriental do Tocantins, Leste Maranhense, Norte Piauiense, Norte de Minas, Centro Norte Baiano, Norte Goiano, Noroeste de Minas, Centro Maranhense, Leste Goiano, Noroeste Cearense",
          altitude: "",
          ceiling: "",
          polygon: [
            {
              id: 770836,
              value:
                "-14.753635,-45.966797 -15.178181,-45.98877 -14.780194,-45.296631 -14.51978,-44.758301 -14.253735,-44.324341 -14.392118,-43.835449 -13.453737,-43.835449 -12.554564,-43.681641 -11.630716,-43.198242 -10.509417,-42.341309 -10.09867,-41.638184 -9.795678,-40.891113 -9.579084,-40.495605 -9.427387,-40.067139 -8.86879,-39.462891 -8.494105,-39.199219 -8.309341,-39.171753 -8.124491,-39.199219 -7.765423,-39.440918 -7.536764,-39.693604 -7.242598,-40.045166 -6.8828,-40.352783 -6.664608,-40.621948 -6.031311,-40.913086 -5.615986,-41.000977 -5.222247,-41.044922 -4.872048,-41.19873 -4.631179,-41.220703 -4.313546,-41.33606 -4.105369,-41.572266 -4.149201,-42.121582 -4.412137,-42.60498 -4.67498,-43.022461 -5.244128,-43.549805 -5.9439,-44.187012 -6.599131,-44.692383 -7.253496,-45.153809 -7.661997,-45.401001 -8.086423,-45.609741 -8.624472,-45.834961 -8.901353,-45.950317 -9.432806,-45.840454 -10.00672,-45.840454 -10.277086,-45.758057 -10.978943,-46.296387 -11.366953,-46.560059 -11.625335,-46.170044 -11.802834,-46.274414 -12.173595,-46.334839 -12.554564,-46.274414 -13.09553,-46.307373 -13.34152,-46.115112 -13.576581,-46.19751 -13.923404,-46.230469 -14.370834,-45.955811 -14.753635,-45.966797 ",
            },
          ],
          circle: [
            {
              id: 770836,
              value:
                "-14.753635,-45.966797 -15.178181,-45.98877 -14.780194,-45.296631 -14.51978,-44.758301 -14.253735,-44.324341 -14.392118,-43.835449 -13.453737,-43.835449 -12.554564,-43.681641 -11.630716,-43.198242 -10.509417,-42.341309 -10.09867,-41.638184 -9.795678,-40.891113 -9.579084,-40.495605 -9.427387,-40.067139 -8.86879,-39.462891 -8.494105,-39.199219 -8.309341,-39.171753 -8.124491,-39.199219 -7.765423,-39.440918 -7.536764,-39.693604 -7.242598,-40.045166 -6.8828,-40.352783 -6.664608,-40.621948 -6.031311,-40.913086 -5.615986,-41.000977 -5.222247,-41.044922 -4.872048,-41.19873 -4.631179,-41.220703 -4.313546,-41.33606 -4.105369,-41.572266 -4.149201,-42.121582 -4.412137,-42.60498 -4.67498,-43.022461 -5.244128,-43.549805 -5.9439,-44.187012 -6.599131,-44.692383 -7.253496,-45.153809 -7.661997,-45.401001 -8.086423,-45.609741 -8.624472,-45.834961 -8.901353,-45.950317 -9.432806,-45.840454 -10.00672,-45.840454 -10.277086,-45.758057 -10.978943,-46.296387 -11.366953,-46.560059 -11.625335,-46.170044 -11.802834,-46.274414 -12.173595,-46.334839 -12.554564,-46.274414 -13.09553,-46.307373 -13.34152,-46.115112 -13.576581,-46.19751 -13.923404,-46.230469 -14.370834,-45.955811 -14.753635,-45.966797 ",
            },
          ],
          geocode: [
            {
              id: 770836,
              value:
                "-14.753635,-45.966797 -15.178181,-45.98877 -14.780194,-45.296631 -14.51978,-44.758301 -14.253735,-44.324341 -14.392118,-43.835449 -13.453737,-43.835449 -12.554564,-43.681641 -11.630716,-43.198242 -10.509417,-42.341309 -10.09867,-41.638184 -9.795678,-40.891113 -9.579084,-40.495605 -9.427387,-40.067139 -8.86879,-39.462891 -8.494105,-39.199219 -8.309341,-39.171753 -8.124491,-39.199219 -7.765423,-39.440918 -7.536764,-39.693604 -7.242598,-40.045166 -6.8828,-40.352783 -6.664608,-40.621948 -6.031311,-40.913086 -5.615986,-41.000977 -5.222247,-41.044922 -4.872048,-41.19873 -4.631179,-41.220703 -4.313546,-41.33606 -4.105369,-41.572266 -4.149201,-42.121582 -4.412137,-42.60498 -4.67498,-43.022461 -5.244128,-43.549805 -5.9439,-44.187012 -6.599131,-44.692383 -7.253496,-45.153809 -7.661997,-45.401001 -8.086423,-45.609741 -8.624472,-45.834961 -8.901353,-45.950317 -9.432806,-45.840454 -10.00672,-45.840454 -10.277086,-45.758057 -10.978943,-46.296387 -11.366953,-46.560059 -11.625335,-46.170044 -11.802834,-46.274414 -12.173595,-46.334839 -12.554564,-46.274414 -13.09553,-46.307373 -13.34152,-46.115112 -13.576581,-46.19751 -13.923404,-46.230469 -14.370834,-45.955811 -14.753635,-45.966797 ",
            },
          ],
        },
      ],
    },
  ],
};

test("GetAlertInfoByAlertID fetches successfully data from an API", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const { result, waitForNextUpdate } = renderHook(() =>
    GetAlertInfoByAlertID()
  );

  await act(async () => {
    result.current.refetch(1);
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual(mockData);
  expect(result.current.error).toBe(null);
});

test("noTestID is passed", async () => {
  // Mock the axios.get function to return mock data
  mockedAxios.get.mockResolvedValue({ data: mockData });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() =>
    GetAlertInfoByAlertID()
  );

  // Act: Call refetch with a null alert ID and wait for the update
  await act(async () => {
    result.current.refetch(null);
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null); // Expect data to be set to null
  expect(result.current.error).toEqual("Alert ID is not provided."); // Check error object
});

test("emptyData", async () => {
  // Mock the axios.get function to return mock data
  mockedAxios.get.mockResolvedValue({ data: {} });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() =>
    GetAlertInfoByAlertID()
  );

  // Act: Call refetch with a null alert ID and wait for the update
  await act(async () => {
    result.current.refetch(12);
    await waitForNextUpdate();
  });

  // Assert the expected states after the update
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null); // Expect data to be set to null
  expect(result.current.error).toEqual("Data is empty or invalid."); // Check error object
});
