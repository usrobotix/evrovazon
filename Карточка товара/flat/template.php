<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main\Localization\Loc;

/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CatalogSectionComponent $component
 * @var CBitrixComponentTemplate $this
 * @var string $templateName
 * @var string $componentPath
 * @var string $templateFolder
 */

$this->setFrameMode(true);
//$this->addExternalCss('/bitrix/css/main/bootstrap.css');

$templateLibrary = array('popup', 'fx');
$currencyList = '';

if (!empty($arResult['CURRENCIES']))
{
	$templateLibrary[] = 'currency';
	$currencyList = CUtil::PhpToJSObject($arResult['CURRENCIES'], false, true, true);
}

$templateData = array(
	'TEMPLATE_THEME' => $arParams['TEMPLATE_THEME'],
	'TEMPLATE_LIBRARY' => $templateLibrary,
	'CURRENCIES' => $currencyList,
	'ITEM' => array(
		'ID' => $arResult['ID'],
		'IBLOCK_ID' => $arResult['IBLOCK_ID'],
		'OFFERS_SELECTED' => $arResult['OFFERS_SELECTED'],
		'JS_OFFERS' => $arResult['JS_OFFERS']
	)
);
unset($currencyList, $templateLibrary);

$mainId = $this->GetEditAreaId($arResult['ID']);
$itemIds = array(
	'ID' => $mainId,
	'DISCOUNT_PERCENT_ID' => $mainId.'_dsc_pict',
	'STICKER_ID' => $mainId.'_sticker',
	'BIG_SLIDER_ID' => $mainId.'_big_slider',
	'BIG_IMG_CONT_ID' => $mainId.'_bigimg_cont',
	'SLIDER_CONT_ID' => $mainId.'_slider_cont',
	'OLD_PRICE_ID' => $mainId.'_old_price',
	'PRICE_ID' => $mainId.'_price',
	'DISCOUNT_PRICE_ID' => $mainId.'_price_discount',
	'PRICE_TOTAL' => $mainId.'_price_total',
	'SLIDER_CONT_OF_ID' => $mainId.'_slider_cont_',
	'QUANTITY_ID' => $mainId.'_quantity',
	'QUANTITY_DOWN_ID' => $mainId.'_quant_down',
	'QUANTITY_UP_ID' => $mainId.'_quant_up',
	'QUANTITY_MEASURE' => $mainId.'_quant_measure',
	'QUANTITY_LIMIT' => $mainId.'_quant_limit',
	'BUY_LINK' => $mainId.'_buy_link',
	'ADD_BASKET_LINK' => $mainId.'_add_basket_link',
	'BASKET_ACTIONS_ID' => $mainId.'_basket_actions',
	'NOT_AVAILABLE_MESS' => $mainId.'_not_avail',
	'COMPARE_LINK' => $mainId.'_compare_link',
	'TREE_ID' => $mainId.'_skudiv',
	'DISPLAY_PROP_DIV' => $mainId.'_sku_prop',
	'DISPLAY_MAIN_PROP_DIV' => $mainId.'_main_sku_prop',
	'OFFER_GROUP' => $mainId.'_set_group_',
	'BASKET_PROP_DIV' => $mainId.'_basket_prop',
	'SUBSCRIBE_LINK' => $mainId.'_subscribe',
	'TABS_ID' => $mainId.'_tabs',
	'TAB_CONTAINERS_ID' => $mainId.'_tab_containers',
	'SMALL_CARD_PANEL_ID' => $mainId.'_small_card_panel',
	'TABS_PANEL_ID' => $mainId.'_tabs_panel'
);
$obName = $templateData['JS_OBJ'] = 'ob'.preg_replace('/[^a-zA-Z0-9_]/', 'x', $mainId);
$name = !empty($arResult['IPROPERTY_VALUES']['ELEMENT_PAGE_TITLE'])
	? $arResult['IPROPERTY_VALUES']['ELEMENT_PAGE_TITLE']
	: $arResult['NAME'];
$title = !empty($arResult['IPROPERTY_VALUES']['ELEMENT_DETAIL_PICTURE_FILE_TITLE'])
	? $arResult['IPROPERTY_VALUES']['ELEMENT_DETAIL_PICTURE_FILE_TITLE']
	: $arResult['NAME'];
$alt = !empty($arResult['IPROPERTY_VALUES']['ELEMENT_DETAIL_PICTURE_FILE_ALT'])
	? $arResult['IPROPERTY_VALUES']['ELEMENT_DETAIL_PICTURE_FILE_ALT']
	: $arResult['NAME'];

$haveOffers = !empty($arResult['OFFERS']);
if ($haveOffers)
{
	$actualItem = isset($arResult['OFFERS'][$arResult['OFFERS_SELECTED']])
		? $arResult['OFFERS'][$arResult['OFFERS_SELECTED']]
		: reset($arResult['OFFERS']);
	$showSliderControls = false;

	foreach ($arResult['OFFERS'] as $offer)
	{
		if ($offer['MORE_PHOTO_COUNT'] > 1)
		{
			$showSliderControls = false;
			break;
		}
	}
}
else
{
	$actualItem = $arResult;
	$showSliderControls = $arResult['MORE_PHOTO_COUNT'] > 1;
}

$skuProps = array();
$price = $actualItem['ITEM_PRICES'][$actualItem['ITEM_PRICE_SELECTED']];
$measureRatio = $actualItem['ITEM_MEASURE_RATIOS'][$actualItem['ITEM_MEASURE_RATIO_SELECTED']]['RATIO'];
$showDiscount = $price['PERCENT'] > 0;

$showDescription = !empty($arResult['PREVIEW_TEXT']) || !empty($arResult['DETAIL_TEXT']);
$showBuyBtn = in_array('BUY', $arParams['ADD_TO_BASKET_ACTION']);
$buyButtonClassName = in_array('BUY', $arParams['ADD_TO_BASKET_ACTION_PRIMARY']) ? 'btn-default' : 'btn-link';
$showAddBtn = in_array('ADD', $arParams['ADD_TO_BASKET_ACTION']);
$showButtonClassName = in_array('ADD', $arParams['ADD_TO_BASKET_ACTION_PRIMARY']) ? 'btn-default' : 'btn-link';
$showSubscribe = $arParams['PRODUCT_SUBSCRIPTION'] === 'Y' && ($arResult['CATALOG_SUBSCRIBE'] === 'Y' || $haveOffers);

$arParams['MESS_BTN_BUY'] = $arParams['MESS_BTN_BUY'] ?: Loc::getMessage('CT_BCE_CATALOG_BUY');
$arParams['MESS_BTN_ADD_TO_BASKET'] = $arParams['MESS_BTN_ADD_TO_BASKET'] ?: Loc::getMessage('CT_BCE_CATALOG_ADD');
$arParams['MESS_NOT_AVAILABLE'] = $arParams['MESS_NOT_AVAILABLE'] ?: Loc::getMessage('CT_BCE_CATALOG_NOT_AVAILABLE');
$arParams['MESS_BTN_COMPARE'] = $arParams['MESS_BTN_COMPARE'] ?: Loc::getMessage('CT_BCE_CATALOG_COMPARE');
$arParams['MESS_PRICE_RANGES_TITLE'] = $arParams['MESS_PRICE_RANGES_TITLE'] ?: Loc::getMessage('CT_BCE_CATALOG_PRICE_RANGES_TITLE');
$arParams['MESS_DESCRIPTION_TAB'] = $arParams['MESS_DESCRIPTION_TAB'] ?: Loc::getMessage('CT_BCE_CATALOG_DESCRIPTION_TAB');
$arParams['MESS_PROPERTIES_TAB'] = $arParams['MESS_PROPERTIES_TAB'] ?: Loc::getMessage('CT_BCE_CATALOG_PROPERTIES_TAB');
$arParams['MESS_COMMENTS_TAB'] = $arParams['MESS_COMMENTS_TAB'] ?: Loc::getMessage('CT_BCE_CATALOG_COMMENTS_TAB');
//$arParams['MESS_SHOW_MAX_QUANTITY'] = $arParams['MESS_SHOW_MAX_QUANTITY'] ?: Loc::getMessage('CT_BCE_CATALOG_SHOW_MAX_QUANTITY');
$arParams['MESS_SHOW_MAX_QUANTITY'] = 100;
$arParams['MESS_RELATIVE_QUANTITY_MANY'] = $arParams['MESS_RELATIVE_QUANTITY_MANY'] ?: Loc::getMessage('CT_BCE_CATALOG_RELATIVE_QUANTITY_MANY');
$arParams['MESS_RELATIVE_QUANTITY_FEW'] = $arParams['MESS_RELATIVE_QUANTITY_FEW'] ?: Loc::getMessage('CT_BCE_CATALOG_RELATIVE_QUANTITY_FEW');

$positionClassMap = array(
	'left' => 'product-item-label-left',
	'center' => 'product-item-label-center',
	'right' => 'product-item-label-right',
	'bottom' => 'product-item-label-bottom',
	'middle' => 'product-item-label-middle',
	'top' => 'product-item-label-top'
);

$discountPositionClass = 'product-item-label-big';
if ($arParams['SHOW_DISCOUNT_PERCENT'] === 'Y' && !empty($arParams['DISCOUNT_PERCENT_POSITION']))
{
	foreach (explode('-', $arParams['DISCOUNT_PERCENT_POSITION']) as $pos)
	{
		$discountPositionClass .= isset($positionClassMap[$pos]) ? ' '.$positionClassMap[$pos] : '';
	}
}

$labelPositionClass = 'product-item-label-big';
if (!empty($arParams['LABEL_PROP_POSITION']))
{
	foreach (explode('-', $arParams['LABEL_PROP_POSITION']) as $pos)
	{
		$labelPositionClass .= isset($positionClassMap[$pos]) ? ' '.$positionClassMap[$pos] : '';
	}
}
?>
<style>
.product_scu_item--sell:after{
	bottom: -25px;
    content: 'Скидка';
    left: 0;
    width: 100%;
    position: absolute;
    background: orange;
    color: black;
    font-size: 12px;
    padding: 2px 5px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
}
</style>
<div class="prod" id="<?=$itemIds['ID']?>">
	<div class = 'prod_left'>
		<div class = 'prod_left_right'>
			<?if(!empty($arResult['PROPERTIES']['NEW']['VALUE'])):?>
				<div class="full-product__label">
					<div class="full-product__new">new</div>
				</div>
			<?endif;?> 
			<div class="prod_slider_wrap">
                <div class="prod_slider" data-entity="images-container" id="<?=$itemIds['BIG_SLIDER_ID']?>">
                <?
                $step = 0;
                if (!empty($arResult['MORE_PHOTOS']))
                {
                    foreach ($arResult['MORE_PHOTOS'] as $photo)
                    {$step++;
                        ?>
                        <div class="prod_slider__item">
                            <a data-fancybox="image" href = '<?=$photo['MAX']['src']?>'>
                                <img class="" src="<?=$photo['MIN']['src']?>" alt="<?=$alt?>,  фото <?=$step?> – Евровазон" title = '<?=$alt?>,  фото <?=$step?>'>
                            </a>
                        </div>
                        <?
                    }
                }
                if (!empty($arResult['PROPERTIES']['VIDEO_YOUTUBE']['VALUE']))
                {
                    foreach($arResult['PROPERTIES']['VIDEO_YOUTUBE']['VALUE'] as $video_url) {
                        preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $video_url, $matches);
                        $video_id = $matches[1];
                        if (!$video_id) continue;
                        $step++;
                        ?>
                        <div class="prod_slider__item">
                            <a data-fancybox="image" href='<?=$video_url?>' class="video">
                                <img src="https://img.youtube.com/vi/<?=$video_id?>/maxresdefault.jpg" alt="<?=$alt?>,  фото <?=$step?> – Евровазон" title = '<?=$alt?>,  фото <?=$step?>'>
                            </a>
                        </div>
                        <?
				    }
                }
                ?>
                </div>
                <?if($arResult['PROPERTIES']['DOCUMENTATION']['VALUE']):?>
                    <div class="product_documentation">
                        <a href="<?=CFile::GetPath($arResult['PROPERTIES']['DOCUMENTATION']['VALUE']);?>" download class="product_documentation_link">
                            <div class="product_documentation_heading">Скачать</div>
                            <div class="product_documentation_title">Каталог серии</div>
                        </a>
                    </div>
                <?endif;?>
            </div>
			<div class='options_list'>
				<?

				$arParams['PRODUCT_INFO_BLOCK_ORDER'][0] = 'props';
				$arParams['PRODUCT_INFO_BLOCK_ORDER'][1] = 'sku';
				foreach ($arParams['PRODUCT_INFO_BLOCK_ORDER'] as $blockName)
				{
					switch ($blockName)
					{
						case 'props':
						if (!empty($arResult['DISPLAY_PROPERTIES']) || $arResult['SHOW_OFFERS_PROPS'])
						{
							if (!empty($arResult['DISPLAY_PROPERTIES']))
							{
								foreach ($arResult['DISPLAY_PROPERTIES'] as $property)
								{
									if (isset($arParams['MAIN_BLOCK_PROPERTY_CODE'][$property['CODE']]))
									{
										?>
										<div class = 'option_item'>
											
											<div class="item_img">
												<?if($property['CODE'] == 'length'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_1.svg' alt = 'Длина' title = 'Длина'>
												<?elseif($property['CODE'] == 'width'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_3.svg' alt = 'Ширина' title = 'Ширина'>
												<?elseif($property['CODE'] == 'height'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_2.svg' alt = 'Высота' title = 'Высота'>
												<?elseif($property['CODE'] == 'weight'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_4.svg' alt = 'Вес' title = 'Вес'>
												<?elseif($property['CODE'] == 'diameter'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_6.svg' alt = 'Диаметр' title = 'Диаметр'>
												<?elseif($property['CODE'] == 'RADIUS'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_7.svg' alt = 'Радиус' title = 'Радиус'>
												<?elseif($property['CODE'] == 'VOLUME'):?>
													<img src = '<?=SITE_TEMPLATE_PATH?>/images/svg/prop_5.svg' alt = 'Объем' title = 'Объем'>
												<?endif;?>
											</div>
											<span>
												<?=$property['NAME'];?><br>
												<?=(is_array($property['DISPLAY_VALUE'])
												? implode(' / ', $property['DISPLAY_VALUE'])
												: $property['DISPLAY_VALUE'])?>
												<?=$property['HINT'];?>
											</span>
										</div>
										<?
									}
								}
								unset($property);
							}
						}
						break;
					}
				}
				?>
			</div>
			<div class="product_price"></div>
		</div>
		<div class = 'prod_left_left'>
			<div class="prod_slider_left">
				<?foreach($arResult['MORE_PHOTOS'] as $arPhoto1):?>
					<div class="prod_slider__item">
						<img data-src="<?=$arPhoto1['SMALL']['src']?>" alt="<?=$alt?>,  фото <?=$step?> – Евровазон" title = '<?=$alt?>,  фото <?=$step?>' class="lazy2" src="<?=SITE_TEMPLATE_PATH?>/images/1x1.png">
					</div>
				<?endforeach;?>
				<?foreach($arResult['PROPERTIES']['VIDEO_YOUTUBE']['VALUE'] as $video_url):?>
				    <?
                    preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $video_url, $matches);
                    $video_id = $matches[1];
                    if (!$video_id) continue;
                    ?>
					<div class="prod_slider__item video">
						<img data-src="https://img.youtube.com/vi/<?=$video_id?>/mqdefault.jpg" alt="<?=$alt?>,  фото <?=$step?> – Евровазон" title = '<?=$alt?>,  фото <?=$step?>' class="lazy2" src="<?=SITE_TEMPLATE_PATH?>/images/1x1.png">
					</div>
				<?endforeach;?>
			</div>
		</div>
	</div>
	<div class = 'prod_right'>	
		<div class = 'prod_right_card'>
			<?
			if($arResult['IPROPERTY_VALUES']['ELEMENT_PAGE_TITLE']!=''):
				$h1_title=$arResult['IPROPERTY_VALUES']['ELEMENT_PAGE_TITLE'];
			else:
				$h1_title=$arResult['NAME'];
			endif;
			?>
			<h1 class = 'h4'><?=$h1_title;?></h1>
			<div class='clearfix'></div>
			<?
			$arParams['PRODUCT_INFO_BLOCK_ORDER'][0] = 'props';
			$arParams['PRODUCT_INFO_BLOCK_ORDER'][1] = 'sku';
			foreach ($arParams['PRODUCT_INFO_BLOCK_ORDER'] as $blockName)
			{
				switch ($blockName)
				{
					case 'sku':
					if ($haveOffers && !empty($arResult['OFFERS_PROP']))
					{
						?>
						<div id="<?=$itemIds['TREE_ID']?>">
							<?
							foreach ($arResult['SKU_PROPS'] as $skuProperty)
							{
								if (!isset($arResult['OFFERS_PROP'][$skuProperty['CODE']]))
									continue;

								$propertyId = $skuProperty['ID'];
								$skuProps[] = array(
									'ID' => $propertyId,
									'SHOW_MODE' => $skuProperty['SHOW_MODE'],
									'VALUES' => $skuProperty['VALUES'],
									'VALUES_COUNT' => $skuProperty['VALUES_COUNT']
								);
								?>
									<small class='title_small'>
										<?if($skuProperty['CODE'] == 'FACTURE'):?>
											Выбрать фактуру "мытый" бетон
										<?elseif($skuProperty['CODE'] == 'FACTURE_POLISHED'):?>
											Выбрать фактуру "полированный" бетон
										<?elseif($skuProperty['CODE'] == 'COLOR_MET'):?>
											Выбрать цвет металла
										<?elseif($skuProperty['CODE'] == 'COLOR_TREE'):?>
											Выбрать цвет дерева
										<?elseif($skuProperty['CODE'] == 'SIZENEW'):?>
											Выбрать размер
										<?else:?>
											Выберите свойство (<?=$skuProperty['NAME']?>):
										<?endif;?>
									</small>
									<div data-entity="sku-line-block">
										<ul class="product_scu_list">
											<?
											foreach ($skuProperty['VALUES'] as &$value)
											{
												$value['NAME'] = htmlspecialcharsbx($value['NAME']);

												if ($skuProperty['SHOW_MODE'] === 'PICT')
												{?>

													<?if ($skuProperty['CODE'] == 'FACTURE'){?>
														<li data-src="<?=$value['PICT']['SRC']?>" class="<?if($value['ID']=='10'):?> sell <?endif;?><?= ($value['XML_ID'] == $arResult["OFFERS"][$arResult["SELECTED_OFFER"]]["PROPERTIES"]["FACTURE"]["VALUE"]) ? 'selected' : ''; ?>" title="<?=$value['NAME']?>"
															data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
															data-onevalue="<?=$value['ID']?>"
															data-sub-html="<?=$value['NAME']?>">
															<div class="product_scu_item <?/*if($value['ID']=='10'):?> product_scu_item--sell<?endif;*/?>">
																<a class="highslide" href="<?=$value['PICT']['SRC']?>" data-sub-html="<?=$value['NAME']?>"></a>
																<div class="product_scu_item_img" title="<?=$value['NAME']?>">
																	<img class = 'lazy' alt="<?=$value['NAME']?>" data-src="<?=$value['PICT']['SRC']?>">
																</div>
															</div>
														</li>
													<?}elseif($skuProperty['CODE'] == 'FACTURE_POLISHED'){?>
														<li data-src="<?=$value['PICT']['SRC']?>" class="<?if($value['ID']=='10'):?> sell <?endif;?><?= ($value['XML_ID'] == $arResult["OFFERS"][$arResult["SELECTED_OFFER"]]["PROPERTIES"]["FACTURE_POLISHED"]["VALUE"]) ? 'selected' : ''; ?>" title="<?=$value['NAME']?>"
															data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
															data-onevalue="<?=$value['ID']?>"
															data-sub-html="<?=$value['NAME']?>">
															<div class="product_scu_item <?/*if($value['ID']=='10'):?> product_scu_item--sell<?endif;*/?>">
																<a class="highslide" href="<?=$value['PICT']['SRC']?>" data-sub-html="<?=$value['NAME']?>"></a>
																<div class="product_scu_item_img" title="<?=$value['NAME']?>">
																	<img class = 'lazy' alt="<?=$value['NAME']?>" data-src="<?=$value['PICT']['SRC']?>">
																</div>
															</div>
														</li>
													<?}elseif($skuProperty['CODE'] == 'COLOR_MET'){?>
														<li data-src="<?=$value['PICT']['SRC']?>" class="<?= ($value['XML_ID'] == $arResult["OFFERS"][$arResult["SELECTED_OFFER"]]["PROPERTIES"]["COLOR_MET"]["VALUE"]) ? 'selected' : ''; ?>" title="<?=$value['NAME']?>"
															data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
															data-onevalue="<?=$value['ID']?>"
															data-sub-html="<?=$value['NAME']?>">
															<div class="product_scu_item">
																<a class="highslide" href="<?=$value['PICT']['SRC']?>" data-sub-html="<?=$value['NAME']?>"></a>
																<div class="product_scu_item_img" title="<?=$value['NAME']?>">
																	<img class = 'lazy' alt="<?=$value['NAME']?>" data-src="<?=$value['PICT']['SRC']?>">
																</div>
															</div>
														</li>
													<?}elseif($skuProperty['CODE'] == 'COLOR_TREE'){?>
														<li data-src="<?=$value['PICT']['SRC']?>" class="<?= ($value['XML_ID'] == $arResult["OFFERS"][$arResult["SELECTED_OFFER"]]["PROPERTIES"]["COLOR_TREE"]["VALUE"]) ? 'selected' : ''; ?>" title="<?=$value['NAME']?>"
															data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
															data-onevalue="<?=$value['ID']?>"
															data-sub-html="<?=$value['NAME']?>">
															<div class="product_scu_item">
																<a class="highslide" href="<?=$value['PICT']['SRC']?>" data-sub-html="<?=$value['NAME']?>"></a>
																<div class="product_scu_item_img" title="<?=$value['NAME']?>">
																	<img class = 'lazy' alt="<?=$value['NAME']?>" data-src="<?=$value['PICT']['SRC']?>">
																</div>
															</div>
														</li>
													<?}elseif($skuProperty['CODE'] == 'SIZENEW'){?>
														<li data-src="<?=$value['PICT']['SRC']?>" class="<?= ($value['XML_ID'] == $arResult["OFFERS"][$arResult["SELECTED_OFFER"]]["PROPERTIES"]["COLOR_TREE"]["VALUE"]) ? 'selected' : ''; ?>" title="<?=$value['NAME']?>"
															data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
															data-onevalue="<?=$value['ID']?>"
															data-sub-html="<?=$value['NAME']?>">
															<div class="product_scu_item">
																
																<div class="product_scu_item_img" title="<?=$value['NAME']?>">
																	<img class = 'lazy' alt="<?=$value['NAME']?>" data-src="<?=$value['PICT']['SRC']?>">
																</div>
															</div>
														</li>
													<?}?>
													<?
												}
												else
												{
													?>
													<li class="product_scu_item product-item-scu-item-text-container" title="<?=$value['NAME']?>"
														data-treevalue="<?=$propertyId?>_<?=$value['ID']?>"
														data-onevalue="<?=$value['ID']?>">
														<div class="product_scu_item_img product-item-scu-item-text-block">
															<div class="product-item-scu-item-text"><?=$value['NAME']?></div>
														</div>
													</li>
													<?
												}
											}
											?>
										</ul>
									</div>			
								<?
							}
							?>
						</div>
					<?
					}
					break;
				}
			}
			?>
			
			<div class='clearfix'></div>
			<div class='product_price'>
				<?
				foreach ($arParams['PRODUCT_PAY_BLOCK_ORDER'] as $blockName)
				{
					switch ($blockName)
					{
						case 'price':
							?>
								<div class = 'product_price_title'>
									<?if ($price['DISCOUNT']>0){?>
										<div class="product-item-detail-price-old" id="<?=$itemIds['OLD_PRICE_ID']?>" style="color:#76b828;">
											<div class="price-old"><span><strong><?=($showDiscount ? $price['PRINT_RATIO_BASE_PRICE'] : '')?></strong></span></div>
										</div>
									<?}?>
									<?
									if($price['PRICE'] != 0)
									{?>
										<strong id="<?=$itemIds['PRICE_ID']?>">
											<?=$price['PRINT_RATIO_PRICE'];?>
										</strong>
									<?}else{?>
										<strong id="<?=$itemIds['PRICE_ID']?>" style ='display: none;'>

										</strong>
										<strong>
											По запросу
										</strong>
									<?}?>
									<small>
										Включая НДС. Гарантия 12 мес.
									</small>
								</div>
								<div class = 'product_price_title'>
									<?
									if ($arParams['SHOW_OLD_PRICE'] === 'Y')
									{
										?>
										<div class="item_economy_price" id="<?=$itemIds['DISCOUNT_PRICE_ID']?>"
											style="display: <?=($showDiscount ? '' : 'none')?>;">
											<?
											if ($showDiscount)
											{
												echo Loc::getMessage('CT_BCE_CATALOG_ECONOMY_INFO2', array('#ECONOMY#' => $price['PRINT_RATIO_DISCOUNT']));
											}
											?>
										</div>
										<?
									}
									?>
								</div>
							<?
							break;

						case 'priceRanges':
							if ($arParams['USE_PRICE_COUNT'])
							{
								$showRanges = !$haveOffers && count($actualItem['ITEM_QUANTITY_RANGES']) > 1;
								$useRatio = $arParams['USE_RATIO_IN_RANGES'] === 'Y';
								?>
								<div class="product-item-detail-info-container"
									<?=$showRanges ? '' : 'style="display: none;"'?>
									data-entity="price-ranges-block">
									<div class="product-item-detail-info-container-title">
										<?=$arParams['MESS_PRICE_RANGES_TITLE']?>
										<span data-entity="price-ranges-ratio-header">
											(<?=(Loc::getMessage(
												'CT_BCE_CATALOG_RATIO_PRICE',
												array('#RATIO#' => ($useRatio ? $measureRatio : '1').' '.$actualItem['ITEM_MEASURE']['TITLE'])
											))?>)
										</span>
									</div>
									<dl class="product-item-detail-properties" data-entity="price-ranges-body">
										<?
										if ($showRanges)
										{
											foreach ($actualItem['ITEM_QUANTITY_RANGES'] as $range)
											{
												if ($range['HASH'] !== 'ZERO-INF')
												{
													$itemPrice = false;

													foreach ($arResult['ITEM_PRICES'] as $itemPrice)
													{
														if ($itemPrice['QUANTITY_HASH'] === $range['HASH'])
														{
															break;
														}
													}

													if ($itemPrice)
													{
														?>
														<dt>
															<?
															echo Loc::getMessage(
																	'CT_BCE_CATALOG_RANGE_FROM',
																	array('#FROM#' => $range['SORT_FROM'].' '.$actualItem['ITEM_MEASURE']['TITLE'])
																).' ';

															if (is_infinite($range['SORT_TO']))
															{
																echo Loc::getMessage('CT_BCE_CATALOG_RANGE_MORE');
															}
															else
															{
																echo Loc::getMessage(
																	'CT_BCE_CATALOG_RANGE_TO',
																	array('#TO#' => $range['SORT_TO'].' '.$actualItem['ITEM_MEASURE']['TITLE'])
																);
															}
															?>
														</dt>
														<dd><?=($useRatio ? $itemPrice['PRINT_RATIO_PRICE'] : $itemPrice['PRINT_PRICE'])?></dd>
														<?
													}
												}
											}
										}
										?>
									</dl>
								</div>
								<?
								unset($showRanges, $useRatio, $itemPrice, $range);
							}

							break;

						case 'quantityLimit':
							if ($arParams['SHOW_MAX_QUANTITY'] !== 'N')
							{
								if ($haveOffers)
								{
									?>
									<div class="product-item-detail-info-container" id="<?=$itemIds['QUANTITY_LIMIT']?>" style="display: none;">
										<div class="product-item-detail-info-container-title">
											<?=$arParams['MESS_SHOW_MAX_QUANTITY']?>:
											<span class="product-item-quantity" data-entity="quantity-limit-value"></span>
										</div>
									</div>
									<?
								}
								else
								{
									if (
										$measureRatio
										&& (float)$actualItem['CATALOG_QUANTITY'] > 0
										&& $actualItem['CATALOG_QUANTITY_TRACE'] === 'Y'
										&& $actualItem['CATALOG_CAN_BUY_ZERO'] === 'N'
									)
									{
										?>
										<div class="product-item-detail-info-container" id="<?=$itemIds['QUANTITY_LIMIT']?>">
											<div class="product-item-detail-info-container-title">
												<?=$arParams['MESS_SHOW_MAX_QUANTITY']?>:
												<span class="product-item-quantity" data-entity="quantity-limit-value">
													<?
													if ($arParams['SHOW_MAX_QUANTITY'] === 'M')
													{
														if ((float)$actualItem['CATALOG_QUANTITY'] / $measureRatio >= $arParams['RELATIVE_QUANTITY_FACTOR'])
														{
															echo $arParams['MESS_RELATIVE_QUANTITY_MANY'];
														}
														else
														{
															echo $arParams['MESS_RELATIVE_QUANTITY_FEW'];
														}
													}
													else
													{
														echo $actualItem['CATALOG_QUANTITY'].' '.$actualItem['ITEM_MEASURE']['TITLE'];
													}
													?>
												</span>
											</div>
										</div>
										<?
									}
								}
							}

							break;

						case 'quantity':
							if ($arParams['USE_PRODUCT_QUANTITY'])
							{
								?>
								<?
								if ($arParams['USE_PRODUCT_QUANTITY'])
								{
									?>
									<div class="product_price_amount" style="<?=(!$actualItem['CAN_BUY'] ? 'display: none;' : '')?>">
										<button id="<?=$itemIds['QUANTITY_DOWN_ID']?>" type="button" class="amount_minus">-</button>
											<input id="<?=$itemIds['QUANTITY_ID']?>" type="text" name="amount" maxlength="4" value="<?=$price['MIN_QUANTITY']?>" />
										<button id="<?=$itemIds['QUANTITY_UP_ID']?>" type="button" class="amount_plus">+</button>
									</div>
								<?}?>

								<?
							}

							break;

						case 'buttons':
						?>
							<div class = 'button button--product' id="<?=$itemIds['BASKET_ACTIONS_ID']?>" style="display: <?=($actualItem['CAN_BUY'] ? '' : 'none')?>;">
								<?
								if ($showAddBtn)
								{
									?>
										<a class="buy_click" id="<?=$itemIds['ADD_BASKET_LINK']?>" href="javascript:void(0);">
											<?=$arParams['MESS_BTN_ADD_TO_BASKET']?>
										</a>
									<?
								}

								if ($showBuyBtn)
								{/*
									?>
									<div class="product-item-detail-info-container">
										<a class="btn <?=$buyButtonClassName?> product-item-detail-buy-button site-btn full-product__order-button" id="<?=$itemIds['BUY_LINK']?>"
											href="javascript:void(0);">
											<span><?=$arParams['MESS_BTN_BUY']?></span>
										</a>
									</div>
									<?
								*/}
								?>
							</div>
						<?
						break;
					}
				}
				?>
			</div>
			<div class='clearfix'></div>

			<?if($arResult['PROPERTIES']['SKLAD']['VALUE_XML_ID'] == "Y"):?>
				<small class='title_small' style='margin-bottom: 12px;display: inline-block;'>
					<span class = 'new_sklad_point'></span>
					<?=$arResult['PROPERTIES']['SKLAD']['VALUE'];?>
				</small>
			<?endif;?>
			<div class='clearfix'></div>
			<?/*
			<small class='title_small' style='margin-bottom: 12px;display: inline-block;'>
				<?
				$APPLICATION->IncludeComponent(
					"bitrix:main.include", "", array(
					"AREA_FILE_SHOW" => "file",
					"AREA_FILE_SUFFIX" => "inc",
					"EDIT_TEMPLATE" => "",
					"PATH" => SITE_TEMPLATE_PATH . "/includes/delivery_card.php",
						)
				);
				?>
			</small>
			<br>
			<small class='title_small' style='margin-bottom: 12px;display: inline-block;'>
				<a href = '/faq/'>
					Еще остались вопросы?
				</a>
			</small>
			*/?>
		</div>
		<br>
		<?/*
		<br>
		<div class='popular_tags' data-id="1">
			<?//SEO Netpeak
			if ($curl = curl_init()) {
				$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
				//print_r($url);
				curl_setopt($curl, CURLOPT_URL, 'https://seo.netpeak.cloud/kap/auto?url=' . $url . '&project_id=8485&key=84ac0fb39b57e2512348243bd93ec690a21d45ae');
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
				curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 1);
				$out = curl_exec($curl);
				curl_close($curl);
				$out = json_decode($out, TRUE);
				if (!empty($out)) {
					echo '<div>Популярные запросы:</div><ul>';
					foreach ($out as $value) {
						// Подменяем старый адрес сайта
						$value['url'] = str_replace('eurovazon.ru', 'eurovazon.com', $value['url']);
						echo '<li><a href="' . $value['url'] . '">' . $value['anchor'] . '</a>&nbsp;&nbsp;</li>';
					}
					echo '</ul>';
				}
			}
			?>
		</div>
        */?>
	</div>
</div>
<div class='clearfix'></div>
<?
global $USER;
$status_design = false;
$status_project = false;
if ($USER->IsAuthorized()){
	$user_id = $USER->GetID();
	$arGroups = CUser::GetUserGroup($user_id);
	foreach($arGroups as $group){
		if($group == '7'){
			$status_design = true;
		}
		elseif($group == '6'){
			$status_project = true;
		}
	}
}
?>
<style>
    .tabs__content {
    display: none; /* по умолчанию прячем все блоки */
    }
    .tabs__content.active {
    display: block; /* по умолчанию показываем нужный блок */
    }
</style>

<?
$tabProps = $arResult['PROPERTIES']['PROPS']['VALUE'];
$tabDocs = $arResult['PROPERTIES']['DOCUMENTATIONS']['VALUE'];
$tabGuarantees = $arResult['PROPERTIES']['GUARANTEE']['VALUE'];
?>

<div class="prod">
	<div class = 'prod_left'>	
		<div class = 'prod_left_left'>&nbsp;</div>
		<div class = 'prod_left_right'>	
			<div class="prod_tabs tabs">
				<ul class="prod_tabs_list tabs__caption">
					<li class="active">
						<span class="amazing-link">Описание</span>
					</li>
                    <?if ($tabProps):?>
					<li>
						<span class="amazing-link">Характеристики</span>
					</li>
					<?endif;?>
                    <?if ($tabDocs):?>
					<li>
						<span class="amazing-link">Документация</span>
					</li>
					<?endif;?>
                    <?if ($tabGuarantees):?>
					<li>
						<span class="amazing-link">Гарантия</span>
					</li>
					<?endif;?>
					<?/*if($status_project == true):?>
					<li>
						<span class="amazing-link">Технические данные</span>
					</li>
					<?else:?>
					<li>
						<span class="amazing-link lock">Технические данные</span>
					</li>
					<?endif;*/?>
				</ul>
				<div class="prod_tab tabs__content active" id="product-tab1">
					<?=$arResult['DETAIL_TEXT']?>
					<?
					if ($curl = curl_init()) {
						$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
						curl_setopt($curl, CURLOPT_URL, 'https://seo.netpeak.cloud/tags?url=' . $url . '&project_id=8485&key=84ac0fb39b57e2512348243bd93ec690a21d45ae');
						curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
						curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
						curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 1);
						$out = curl_exec($curl);
						curl_close($curl);
						$out = json_decode($out, TRUE);
						if (!empty($out)) {
							echo '<div>Популярные запросы:</div><ul>';
							foreach ($out as $value) {
								echo '<li><a href="' . $value['url'] . '">' . $value['anchor'] . '</a></li>';
							}
							echo '</ul>';
						}
					}
					?>
					<br>
					<div class='clearfix'></div>
					<div class = 'button'>
						<a class="product-quest-but" href="#" data-url="product-quest">
							Задать вопрос о продукте
						</a>
					</div>
				</div>
                <?if ($tabProps):?>
                    <div class="prod_tab tabs__content" id="product-tab2">
                        <?= htmlspecialchars_decode($arResult['PROPERTIES']['PROPS']['VALUE']['TEXT']) ?>
                    </div>
                <?endif;?>
                <?if ($tabDocs):?>
                    <div class="prod_tab tabs__content" id="product-tab3">
                        <div class="documents_list">
                        <? foreach ($arResult['PROPERTIES']['DOCUMENTATIONS']['VALUE'] as $i => $docId) :?>
                            <div class="product_documentation">
                                <a href="<?=CFile::GetPath($docId);?>" download class="product_documentation_link">
                                    <div class="product_documentation_heading">Скачать</div>
                                    <div class="product_documentation_title"><?= $arResult['PROPERTIES']['DOCUMENTATIONS']['DESCRIPTION'][$i] ?></div>
                                </a>
                            </div>
                        <? endforeach; ?>
                        </div>
                    </div>
                <?endif;?>
                <?if ($tabGuarantees):?>
                    <div class="prod_tab tabs__content" id="product-tab4">
                        <?= htmlspecialchars_decode($arResult['PROPERTIES']['GUARANTEE']['VALUE']['TEXT']) ?>
                    </div>
                <?endif;?>
				<?/*
				<div class="prod_tab tabs__content" id="product-tab2">
					<?if($status_project == true):?>
						<p>
							<?=$arResult['PROPERTIES']['SEC_HTML']['VALUE']['TEXT']?>
						</p>
						<br>
						<?if(count($arResult["PROPERTIES"]['SEC_FILES']['VALUE']) >= 2):?>
							<?
							$k = 0;
							foreach($arResult["PROPERTIES"]['SEC_FILES']['~VALUE'] as $arFile):
							$file = CFile::GetPath($arFile);

							?>
								<div class = 'docs_item'>
									<a href = '<?=$file;?>' target = 'blank'>
										<span>
											<?if($arResult["PROPERTIES"]['SEC_FILES']['~DESCRIPTION'][$k] != ''):?>
											<?=$arResult["PROPERTIES"]['SEC_FILES']['~DESCRIPTION'][$k];?>
											<?else:?>
												Вложение №<?=$k + 1;?>
											<?endif;?>
										</span>
									</a>
								</div>
							<?$k++;
							endforeach;?>
						<?else:?>
							<div class = 'docs_item'>
								<?$file = CFile::GetPath($arResult["PROPERTIES"]['SEC_FILES']['~VALUE'][0]);?>
								<?if($file!=''):?>
								<a href = '<?=$file;?>' target = 'blank'>
									<span>
										<?if($arResult["PROPERTIES"]['SEC_FILES']['DESCRIPTION'][0] != ''):?>
										<?=$arResult["PROPERTIES"]['SEC_FILES']['DESCRIPTION'][0];?>
										<?else:?>
											Вложение
										<?endif;?>
									</span>
								</a>
								<?endif;?>
							</div>
						<?endif;?>
					<?else:?>
						<p>
							Требуется регистрация
						</p>
				<?endif;?>
				</div>
				*/?>
			</div>
		</div>
	</div>
<?/*</div>*/?>
<?
if ($haveOffers)
{
	foreach ($arResult['JS_OFFERS'] as $offer)
	{
		$currentOffersList = array();

		if (!empty($offer['TREE']) && is_array($offer['TREE']))
		{
			foreach ($offer['TREE'] as $propName => $skuId)
			{
				$propId = (int)substr($propName, 5);

				foreach ($skuProps as $prop)
				{
					if ($prop['ID'] == $propId)
					{
						foreach ($prop['VALUES'] as $propId => $propValue)
						{
							if ($propId == $skuId)
							{
								$currentOffersList[] = $propValue['NAME'];
								break;
							}
						}
					}
				}
			}
		}

		$offerPrice = $offer['ITEM_PRICES'][$offer['ITEM_PRICE_SELECTED']];
		?>

		<?
	}

	unset($offerPrice, $currentOffersList);
}
else
{
	?>

	<?
}
?>



<?
if ($haveOffers)
{
	$offerIds = array();
	$offerCodes = array();

	$useRatio = $arParams['USE_RATIO_IN_RANGES'] === 'Y';

	foreach ($arResult['JS_OFFERS'] as $ind => &$jsOffer)
	{
		$offerIds[] = (int)$jsOffer['ID'];
		$offerCodes[] = $jsOffer['CODE'];

		$fullOffer = $arResult['OFFERS'][$ind];
		$measureName = $fullOffer['ITEM_MEASURE']['TITLE'];

		$strAllProps = '';
		$strMainProps = '';
		$strPriceRangesRatio = '';
		$strPriceRanges = '';

		if ($arResult['SHOW_OFFERS_PROPS'])
		{
			if (!empty($jsOffer['DISPLAY_PROPERTIES']))
			{
				foreach ($jsOffer['DISPLAY_PROPERTIES'] as $property)
				{
					$current = '<dt>'.$property['NAME'].'</dt><dd>'.(
						is_array($property['VALUE'])
							? implode(' / ', $property['VALUE'])
							: $property['VALUE']
						).'</dd>';
					$strAllProps .= $current;

					if (isset($arParams['MAIN_BLOCK_OFFERS_PROPERTY_CODE'][$property['CODE']]))
					{
						$strMainProps .= $current;
					}
				}

				unset($current);
			}
		}

		if ($arParams['USE_PRICE_COUNT'] && count($jsOffer['ITEM_QUANTITY_RANGES']) > 1)
		{
			$strPriceRangesRatio = '('.Loc::getMessage(
					'CT_BCE_CATALOG_RATIO_PRICE',
					array('#RATIO#' => ($useRatio
							? $fullOffer['ITEM_MEASURE_RATIOS'][$fullOffer['ITEM_MEASURE_RATIO_SELECTED']]['RATIO']
							: '1'
						).' '.$measureName)
				).')';

			foreach ($jsOffer['ITEM_QUANTITY_RANGES'] as $range)
			{
				if ($range['HASH'] !== 'ZERO-INF')
				{
					$itemPrice = false;

					foreach ($jsOffer['ITEM_PRICES'] as $itemPrice)
					{
						if ($itemPrice['QUANTITY_HASH'] === $range['HASH'])
						{
							break;
						}
					}

					if ($itemPrice)
					{
						$strPriceRanges .= '<dt>'.Loc::getMessage(
								'CT_BCE_CATALOG_RANGE_FROM',
								array('#FROM#' => $range['SORT_FROM'].' '.$measureName)
							).' ';

						if (is_infinite($range['SORT_TO']))
						{
							$strPriceRanges .= Loc::getMessage('CT_BCE_CATALOG_RANGE_MORE');
						}
						else
						{
							$strPriceRanges .= Loc::getMessage(
								'CT_BCE_CATALOG_RANGE_TO',
								array('#TO#' => $range['SORT_TO'].' '.$measureName)
							);
						}

						$strPriceRanges .= '</dt><dd>'.($useRatio ? $itemPrice['PRINT_RATIO_PRICE'] : $itemPrice['PRINT_PRICE']).'</dd>';
					}
				}
			}

			unset($range, $itemPrice);
		}

		$jsOffer['DISPLAY_PROPERTIES'] = $strAllProps;
		$jsOffer['DISPLAY_PROPERTIES_MAIN_BLOCK'] = $strMainProps;
		$jsOffer['PRICE_RANGES_RATIO_HTML'] = $strPriceRangesRatio;
		$jsOffer['PRICE_RANGES_HTML'] = $strPriceRanges;
	}

	$templateData['OFFER_IDS'] = $offerIds;
	$templateData['OFFER_CODES'] = $offerCodes;
	unset($jsOffer, $strAllProps, $strMainProps, $strPriceRanges, $strPriceRangesRatio, $useRatio);

	$jsParams = array(
		'CONFIG' => array(
			'USE_CATALOG' => $arResult['CATALOG'],
			'SHOW_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
			'SHOW_PRICE' => true,
			'SHOW_DISCOUNT_PERCENT' => $arParams['SHOW_DISCOUNT_PERCENT'] === 'Y',
			'SHOW_OLD_PRICE' => $arParams['SHOW_OLD_PRICE'] === 'Y',
			'USE_PRICE_COUNT' => $arParams['USE_PRICE_COUNT'],
			'DISPLAY_COMPARE' => $arParams['DISPLAY_COMPARE'],
			'SHOW_SKU_PROPS' => $arResult['SHOW_OFFERS_PROPS'],
			'OFFER_GROUP' => $arResult['OFFER_GROUP'],
			'MAIN_PICTURE_MODE' => $arParams['DETAIL_PICTURE_MODE'],
			'ADD_TO_BASKET_ACTION' => $arParams['ADD_TO_BASKET_ACTION'],
			'SHOW_CLOSE_POPUP' => $arParams['SHOW_CLOSE_POPUP'] === 'Y',
			'SHOW_MAX_QUANTITY' => $arParams['SHOW_MAX_QUANTITY'],
			'RELATIVE_QUANTITY_FACTOR' => $arParams['RELATIVE_QUANTITY_FACTOR'],
			'TEMPLATE_THEME' => $arParams['TEMPLATE_THEME'],
			'USE_STICKERS' => true,
			'USE_SUBSCRIBE' => $showSubscribe,
			'SHOW_SLIDER' => $arParams['SHOW_SLIDER'],
			'SLIDER_INTERVAL' => $arParams['SLIDER_INTERVAL'],
			'ALT' => $alt,
			'TITLE' => $title,
			'MAGNIFIER_ZOOM_PERCENT' => 200,
			'USE_ENHANCED_ECOMMERCE' => $arParams['USE_ENHANCED_ECOMMERCE'],
			'DATA_LAYER_NAME' => $arParams['DATA_LAYER_NAME'],
			'BRAND_PROPERTY' => !empty($arResult['DISPLAY_PROPERTIES'][$arParams['BRAND_PROPERTY']])
				? $arResult['DISPLAY_PROPERTIES'][$arParams['BRAND_PROPERTY']]['DISPLAY_VALUE']
				: null
		),
		'PRODUCT_TYPE' => $arResult['CATALOG_TYPE'],
		'VISUAL' => $itemIds,
		'DEFAULT_PICTURE' => array(
			'PREVIEW_PICTURE' => $arResult['DEFAULT_PICTURE'],
			'DETAIL_PICTURE' => $arResult['DEFAULT_PICTURE']
		),
		'PRODUCT' => array(
			'ID' => $arResult['ID'],
			'ACTIVE' => $arResult['ACTIVE'],
			'NAME' => $arResult['~NAME'],
			'CATEGORY' => $arResult['CATEGORY_PATH']
		),
		'BASKET' => array(
			'QUANTITY' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
			'BASKET_URL' => $arParams['BASKET_URL'],
			'SKU_PROPS' => $arResult['OFFERS_PROP_CODES'],
			'ADD_URL_TEMPLATE' => $arResult['~ADD_URL_TEMPLATE'],
			'BUY_URL_TEMPLATE' => $arResult['~BUY_URL_TEMPLATE']
		),
		'OFFERS' => $arResult['JS_OFFERS'],
		'OFFER_SELECTED' => $arResult['OFFERS_SELECTED'],
		'TREE_PROPS' => $skuProps
	);
}
else
{
	$emptyProductProperties = empty($arResult['PRODUCT_PROPERTIES']);
	if ($arParams['ADD_PROPERTIES_TO_BASKET'] === 'Y' && !$emptyProductProperties)
	{
		?>
		<div id="<?=$itemIds['BASKET_PROP_DIV']?>" style="display: none;">
			<?
			if (!empty($arResult['PRODUCT_PROPERTIES_FILL']))
			{
				foreach ($arResult['PRODUCT_PROPERTIES_FILL'] as $propId => $propInfo)
				{
					?>
					<input type="hidden" name="<?=$arParams['PRODUCT_PROPS_VARIABLE']?>[<?=$propId?>]" value="<?=htmlspecialcharsbx($propInfo['ID'])?>">
					<?
					unset($arResult['PRODUCT_PROPERTIES'][$propId]);
				}
			}

			$emptyProductProperties = empty($arResult['PRODUCT_PROPERTIES']);
			if (!$emptyProductProperties)
			{
				?>
				<table>
					<?
					foreach ($arResult['PRODUCT_PROPERTIES'] as $propId => $propInfo)
					{
						?>
						<tr>
							<td><?=$arResult['PROPERTIES'][$propId]['NAME']?></td>
							<td>
								<?
								if (
									$arResult['PROPERTIES'][$propId]['PROPERTY_TYPE'] === 'L'
									&& $arResult['PROPERTIES'][$propId]['LIST_TYPE'] === 'C'
								)
								{
									foreach ($propInfo['VALUES'] as $valueId => $value)
									{
										?>
										<label>
											<input type="radio" name="<?=$arParams['PRODUCT_PROPS_VARIABLE']?>[<?=$propId?>]"
												value="<?=$valueId?>" <?=($valueId == $propInfo['SELECTED'] ? '"checked"' : '')?>>
											<?=$value?>
										</label>
										<br>
										<?
									}
								}
								else
								{
									?>
									<select name="<?=$arParams['PRODUCT_PROPS_VARIABLE']?>[<?=$propId?>]">
										<?
										foreach ($propInfo['VALUES'] as $valueId => $value)
										{
											?>
											<option value="<?=$valueId?>" <?=($valueId == $propInfo['SELECTED'] ? '"selected"' : '')?>>
												<?=$value?>
											</option>
											<?
										}
										?>
									</select>
									<?
								}
								?>
							</td>
						</tr>
						<?
					}
					?>
				</table>
				<?
			}
			?>
		</div>
		<?
	}

	$jsParams = array(
		'CONFIG' => array(
			'USE_CATALOG' => $arResult['CATALOG'],
			'SHOW_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
			'SHOW_PRICE' => !empty($arResult['ITEM_PRICES']),
			'SHOW_DISCOUNT_PERCENT' => $arParams['SHOW_DISCOUNT_PERCENT'] === 'Y',
			'SHOW_OLD_PRICE' => $arParams['SHOW_OLD_PRICE'] === 'Y',
			'USE_PRICE_COUNT' => $arParams['USE_PRICE_COUNT'],
			'DISPLAY_COMPARE' => $arParams['DISPLAY_COMPARE'],
			'MAIN_PICTURE_MODE' => $arParams['DETAIL_PICTURE_MODE'],
			'ADD_TO_BASKET_ACTION' => $arParams['ADD_TO_BASKET_ACTION'],
			'SHOW_CLOSE_POPUP' => $arParams['SHOW_CLOSE_POPUP'] === 'Y',
			'SHOW_MAX_QUANTITY' => $arParams['SHOW_MAX_QUANTITY'],
			'RELATIVE_QUANTITY_FACTOR' => $arParams['RELATIVE_QUANTITY_FACTOR'],
			'TEMPLATE_THEME' => $arParams['TEMPLATE_THEME'],
			'USE_STICKERS' => true,
			'USE_SUBSCRIBE' => $showSubscribe,
			'SHOW_SLIDER' => $arParams['SHOW_SLIDER'],
			'SLIDER_INTERVAL' => $arParams['SLIDER_INTERVAL'],
			'ALT' => $alt,
			'TITLE' => $title,
			'MAGNIFIER_ZOOM_PERCENT' => 200,
			'USE_ENHANCED_ECOMMERCE' => $arParams['USE_ENHANCED_ECOMMERCE'],
			'DATA_LAYER_NAME' => $arParams['DATA_LAYER_NAME'],
			'BRAND_PROPERTY' => !empty($arResult['DISPLAY_PROPERTIES'][$arParams['BRAND_PROPERTY']])
				? $arResult['DISPLAY_PROPERTIES'][$arParams['BRAND_PROPERTY']]['DISPLAY_VALUE']
				: null
		),
		'VISUAL' => $itemIds,
		'PRODUCT_TYPE' => $arResult['CATALOG_TYPE'],
		'PRODUCT' => array(
			'ID' => $arResult['ID'],
			'ACTIVE' => $arResult['ACTIVE'],
			'PICT' => reset($arResult['MORE_PHOTO']),
			'NAME' => $arResult['~NAME'],
			'SUBSCRIPTION' => true,
			'ITEM_PRICE_MODE' => $arResult['ITEM_PRICE_MODE'],
			'ITEM_PRICES' => $arResult['ITEM_PRICES'],
			'ITEM_PRICE_SELECTED' => $arResult['ITEM_PRICE_SELECTED'],
			'ITEM_QUANTITY_RANGES' => $arResult['ITEM_QUANTITY_RANGES'],
			'ITEM_QUANTITY_RANGE_SELECTED' => $arResult['ITEM_QUANTITY_RANGE_SELECTED'],
			'ITEM_MEASURE_RATIOS' => $arResult['ITEM_MEASURE_RATIOS'],
			'ITEM_MEASURE_RATIO_SELECTED' => $arResult['ITEM_MEASURE_RATIO_SELECTED'],
			'SLIDER_COUNT' => $arResult['MORE_PHOTO_COUNT'],
			'SLIDER' => $arResult['MORE_PHOTO'],
			'CAN_BUY' => $arResult['CAN_BUY'],
			'CHECK_QUANTITY' => true,
			'QUANTITY_FLOAT' => is_float($arResult['ITEM_MEASURE_RATIOS'][$arResult['ITEM_MEASURE_RATIO_SELECTED']]['RATIO']),
			'MAX_QUANTITY' => $arResult['CATALOG_QUANTITY'],
			'STEP_QUANTITY' => $arResult['ITEM_MEASURE_RATIOS'][$arResult['ITEM_MEASURE_RATIO_SELECTED']]['RATIO'],
			'CATEGORY' => $arResult['CATEGORY_PATH']
		),
		'BASKET' => array(
			'ADD_PROPS' => $arParams['ADD_PROPERTIES_TO_BASKET'] === 'Y',
			'QUANTITY' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
			'PROPS' => $arParams['PRODUCT_PROPS_VARIABLE'],
			'EMPTY_PROPS' => $emptyProductProperties,
			'BASKET_URL' => $arParams['BASKET_URL'],
			'ADD_URL_TEMPLATE' => $arResult['~ADD_URL_TEMPLATE'],
			'BUY_URL_TEMPLATE' => $arResult['~BUY_URL_TEMPLATE']
		)
	);
	unset($emptyProductProperties);
}

if ($arParams['DISPLAY_COMPARE'])
{
	$jsParams['COMPARE'] = array(
		'COMPARE_URL_TEMPLATE' => $arResult['~COMPARE_URL_TEMPLATE'],
		'COMPARE_DELETE_URL_TEMPLATE' => $arResult['~COMPARE_DELETE_URL_TEMPLATE'],
		'COMPARE_PATH' => $arParams['COMPARE_PATH']
	);
}
?>

<div class="remodal" id = 'product-quest' data-remodal-id="product-quest" data-remodal-options="hashTracking: false, closeOnOutsideClick: true">
    <div class="icon-close" data-remodal-action="close"></div>
    <div class="remodal-content" id = 'result_form_prod'>
		<div class="remodal-title">Задать вопрос</div>
        <div class="form-block call-back">
            <form action="" id="form_prod">
                <div class="form-block__item form-block__item--user">
                    <div class="form-block__title">
                        Ваше Имя
                    </div>
                    <div class="form-block__text input">
                        <input id="name_form_prod" name="name" type="text">
                    </div>
                </div>
                <div class="form-block__item form-block__item--email">
                    <div class="form-block__title">
                        Ваш Email <span class="form-block__required">*</span>
                    </div>
                    <div class="form-block__text input">
                        <input id="email_form_prod" class="required" name="email" type="text">
                        <input name="request_uri" type="hidden" value='<? echo $_SERVER['REQUEST_URI']; ?>'>
                    </div>
                </div>
				<div class="form-block__item">
                    <div class="form-block__title">
                        Ваш вопрос
                    </div>
                    <div class="form-block__text">
                        <textarea id="text_form_prod" rows="3" name="text" spellcheck="false" data-gramm="false" style = 'resize:none;'></textarea>
                    </div>
                </div>

                <div class="form-block__item form-block__item--hidden">
                    <div class="form-block__text">
                        <input type="text" name = 'url' value = '<?= $dir ?>'>
                        <input type="hidden" name = 'subject' value = 'Задать вопрос о продукте'>
                    </div>
                </div>
                <div class="form-block__button">
                    <input class = 'gr-button site-btn' type='button' value='Задать вопрос' onclick='AjaxFormRequest("result_form_prod", "form_prod", "/send/send_prod.php")'>
                </div>
            </form>
        </div>
    </div>
</div>
<div style="visibility: hidden; position: absolute; left: -9999px; top:0;" itemscope itemtype="http://schema.org/Product">
	<span itemprop="brand"><?= $arResult["DISPLAY_PROPERTIES"]["vendor"]["VALUE"]; ?></span>
	<span itemprop="name"><? echo $arResult['NAME']; ?></span>
	<img itemprop="image" src='<?=$arResult["DETAIL_PICTURE"]["SRC"]?>' />
	<span itemprop="description"><?echo $arResult['DETAIL_TEXT'];?></span>
	<span itemprop="offers" itemscope itemtype="http://schema.org/Offer">
	<meta itemprop="priceCurrency" content="RUB" />
	<span itemprop="price"><?=$price['RATIO_PRICE'];?></span>
	<link itemprop="availability" href="http://schema.org/InStock">1</span>
	</span>
</div>
<script>
	BX.message({
		ECONOMY_INFO_MESSAGE: '<?=GetMessageJS('CT_BCE_CATALOG_ECONOMY_INFO2')?>',
		TITLE_ERROR: '<?=GetMessageJS('CT_BCE_CATALOG_TITLE_ERROR')?>',
		TITLE_BASKET_PROPS: '<?=GetMessageJS('CT_BCE_CATALOG_TITLE_BASKET_PROPS')?>',
		BASKET_UNKNOWN_ERROR: '<?=GetMessageJS('CT_BCE_CATALOG_BASKET_UNKNOWN_ERROR')?>',
		BTN_SEND_PROPS: '<?=GetMessageJS('CT_BCE_CATALOG_BTN_SEND_PROPS')?>',
		BTN_MESSAGE_BASKET_REDIRECT: '<?=GetMessageJS('CT_BCE_CATALOG_BTN_MESSAGE_BASKET_REDIRECT')?>',
		BTN_MESSAGE_CLOSE: '<?=GetMessageJS('CT_BCE_CATALOG_BTN_MESSAGE_CLOSE')?>',
		BTN_MESSAGE_CLOSE_POPUP: '<?=GetMessageJS('CT_BCE_CATALOG_BTN_MESSAGE_CLOSE_POPUP')?>',
		TITLE_SUCCESSFUL: '<?=GetMessageJS('CT_BCE_CATALOG_ADD_TO_BASKET_OK')?>',
		COMPARE_MESSAGE_OK: '<?=GetMessageJS('CT_BCE_CATALOG_MESS_COMPARE_OK')?>',
		COMPARE_UNKNOWN_ERROR: '<?=GetMessageJS('CT_BCE_CATALOG_MESS_COMPARE_UNKNOWN_ERROR')?>',
		COMPARE_TITLE: '<?=GetMessageJS('CT_BCE_CATALOG_MESS_COMPARE_TITLE')?>',
		BTN_MESSAGE_COMPARE_REDIRECT: '<?=GetMessageJS('CT_BCE_CATALOG_BTN_MESSAGE_COMPARE_REDIRECT')?>',
		PRODUCT_GIFT_LABEL: '<?=GetMessageJS('CT_BCE_CATALOG_PRODUCT_GIFT_LABEL')?>',
		PRICE_TOTAL_PREFIX: '<?=GetMessageJS('CT_BCE_CATALOG_MESS_PRICE_TOTAL_PREFIX')?>',
		RELATIVE_QUANTITY_MANY: '<?=CUtil::JSEscape($arParams['MESS_RELATIVE_QUANTITY_MANY'])?>',
		RELATIVE_QUANTITY_FEW: '<?=CUtil::JSEscape($arParams['MESS_RELATIVE_QUANTITY_FEW'])?>',
		SITE_ID: '<?=SITE_ID?>'
	});

	var <?=$obName?> = new JCCatalogElement(<?=CUtil::PhpToJSObject($jsParams, false, true)?>);
</script>
<script>
$('.prod_slider').slick({
	asNavFor: '.prod_slider_left',
	arrows: false,
	slidesToShow: 1,
	fade: true,
	adaptiveHeight: false,
	infinite: true,
	autoplay: false,
	autoplaySpeed: 2000,
	adaptiveHeight: true,

    responsive: [{
        breakpoint: 1024,
        settings: {
            dots: true
        }
    }]
});
$('.prod_slider_left').slick({
	asNavFor: '.prod_slider',
	arrows: true,
	focusOnSelect: true,
	enableDrag: true,
	centerMode: false,
	infinite: false,
	//dots: false,
	prevArrow: '<div class="slider_nav prev"></div>',
	nextArrow: '<div class="slider_nav next"></div>',
	autoplay: false,
	vertical: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	verticalSwiping: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				vertical: false,
				arrows: false,
			}
		},
	// You can unslick at a given breakpoint now by adding:
	// settings: "unslick"
	// instead of a settings object
	]
});
</script>
<?
//global $massID;
$massID = $arResult['PROPERTIES']['RECOMEND']['VALUE'];
$series = $arResult['PROPERTIES']['SERIA']['VALUE'];


if($massID || $series){?>
    <!--noindex-->
	<div class = 'prod_right tabs'>
		<ul class="prod_tabs_list tabs__caption">
            <? if ($series) :
            require_once 'functions.php';
            $hBlock = getSeriaHighloadBlockByXmlId($arResult['PROPERTIES']['SERIA']['VALUE']);

            $seriaAlias = $arResult['PROPERTIES']['SERIA']['VALUE']; // old

            if(!empty($row['UF_NAME'])) {
                $seriaAlias = ToLower(CUtil::translit($row['UF_NAME'], 'ru', array('replace_space' => '_', 'replace_other' => '_')));
            }

            ?><li class="active"><span class="amazing-link" data-href="<?= rtrim($arResult['SECTION']['SECTION_PAGE_URL'], '/') . '/filter/seria-' . $seriaAlias . '/' ?>">Серия</span></li><? endif; ?>
			<? if ($massID) : ?><li class="<?= $series ? '' : 'active' ?>"><span class="amazing-link">Рекомендуемые товары</span></li><? endif; ?>
		</ul>
        <? if ($series) : ?>
            <div class="tabs__content active">
                <?
                global $addFilter;
                $addFilter = Array("IBLOCK_ID"=>$arParams["IBLOCK_ID"], "=PROPERTY_SERIA" => $arResult['PROPERTIES']['SERIA']['VALUE'], "!ID" => $arResult["ID"], "ACTIVE_DATE"=>"Y", "ACTIVE"=>"Y");
                $APPLICATION->IncludeComponent(
                    "bitrix:catalog.section",
                    "recommend",
                    Array(
                        "ACTION_VARIABLE" => "action",
                        "ADD_PICT_PROP" => "-",
                        "ADD_PROPERTIES_TO_BASKET" => "Y",
                        "ADD_SECTIONS_CHAIN" => "N",
                        "ADD_TO_BASKET_ACTION" => "ADD",
                        "AJAX_MODE" => "N",
                        "AJAX_OPTION_ADDITIONAL" => "",
                        "AJAX_OPTION_HISTORY" => "N",
                        "AJAX_OPTION_JUMP" => "N",
                        "AJAX_OPTION_STYLE" => "Y",
                        "BACKGROUND_IMAGE" => "-",
                        "BASKET_URL" => "/personal/basket.php",
                        "BROWSER_TITLE" => "-",
                        "CACHE_FILTER" => "N",
                        "CACHE_GROUPS" => "Y",
                        "CACHE_TIME" => "36000000",
                        "CACHE_TYPE" => "N",
                        "COMPATIBLE_MODE" => "Y",
                        "CONVERT_CURRENCY" => "N",
                        "CUSTOM_FILTER" => "",
                        "DETAIL_URL" => "",
                        "DISABLE_INIT_JS_IN_COMPONENT" => "N",
                        "DISPLAY_BOTTOM_PAGER" => "Y",
                        "DISPLAY_COMPARE" => "N",
                        "DISPLAY_TOP_PAGER" => "N",
                        "ELEMENT_SORT_FIELD" => "sort",
                        "ELEMENT_SORT_FIELD2" => "id",
                        "ELEMENT_SORT_ORDER" => "asc",
                        "ELEMENT_SORT_ORDER2" => "desc",
                        "ENLARGE_PRODUCT" => "STRICT",
                        "FILTER_NAME" => "addFilter",
                        "HIDE_NOT_AVAILABLE" => "N",
                        "HIDE_NOT_AVAILABLE_OFFERS" => "N",
                        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                        "IBLOCK_TYPE" => "1c_catalog",
                        "INCLUDE_SUBSECTIONS" => "Y",
                        "LABEL_PROP" => array(),
                        "LAZY_LOAD" => "N",
                        "LINE_ELEMENT_COUNT" => "3",
                        "LOAD_ON_SCROLL" => "N",
                        "MESSAGE_404" => "",
                        "MESS_BTN_ADD_TO_BASKET" => "В корзину",
                        "MESS_BTN_BUY" => "Купить",
                        "MESS_BTN_DETAIL" => "Подробнее",
                        "MESS_BTN_SUBSCRIBE" => "Подписаться",
                        "MESS_NOT_AVAILABLE" => "Нет в наличии",
                        "META_DESCRIPTION" => "-",
                        "META_KEYWORDS" => "-",
                        "OFFERS_CART_PROPERTIES" => array(),
                        "OFFERS_FIELD_CODE" => array("", ""),
                        "OFFERS_LIMIT" => "9",
                        "OFFERS_PROPERTY_CODE" => array("", ""),
                        "OFFERS_SORT_FIELD" => "sort",
                        "OFFERS_SORT_FIELD2" => "id",
                        "OFFERS_SORT_ORDER" => "asc",
                        "OFFERS_SORT_ORDER2" => "desc",
                        "PAGER_BASE_LINK_ENABLE" => "N",
                        "PAGER_DESC_NUMBERING" => "N",
                        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                        "PAGER_SHOW_ALL" => "N",
                        "PAGER_SHOW_ALWAYS" => "N",
                        "PAGER_TEMPLATE" => ".default",
                        "PAGER_TITLE" => "Товары",
                        "PAGE_ELEMENT_COUNT" => "9",
                        "PARTIAL_PRODUCT_PROPERTIES" => "N",
                        "PRICE_CODE" => array(),
                        "PRICE_VAT_INCLUDE" => "Y",
                        "PRODUCT_BLOCKS_ORDER" => "price,props,sku,quantityLimit,quantity,buttons",
                        "PRODUCT_DISPLAY_MODE" => "N",
                        "PRODUCT_ID_VARIABLE" => "id",
                        "PRODUCT_PROPERTIES" => array(),
                        "PRODUCT_PROPS_VARIABLE" => "prop",
                        "PRODUCT_QUANTITY_VARIABLE" => "quantity",
                        "PRODUCT_ROW_VARIANTS" => "[{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false}]",
                        "PRODUCT_SUBSCRIPTION" => "Y",
                        "PROPERTY_CODE" => array("", ""),
                        "PROPERTY_CODE_MOBILE" => array(),
                        "RCM_PROD_ID" => $arParams["PRODUCT_ID"],
                        "RCM_TYPE" => "any",
                        "SECTION_CODE" => "",
//                        "SECTION_ID" => $arResult["IBLOCK_SECTION_ID"],
                        "SECTION_ID_VARIABLE" => "SECTION_ID",
                        "SECTION_URL" => "",
                        "SECTION_USER_FIELDS" => array("", ""),
                        "SEF_MODE" => "N",
                        "SET_BROWSER_TITLE" => "N",
                        "SET_LAST_MODIFIED" => "N",
                        "SET_META_DESCRIPTION" => "N",
                        "SET_META_KEYWORDS" => "N",
                        "SET_STATUS_404" => "N",
                        "SET_TITLE" => "N",
                        "SHOW_404" => "N",
                        "SHOW_ALL_WO_SECTION" => "N",
                        "SHOW_CLOSE_POPUP" => "N",
                        "SHOW_DISCOUNT_PERCENT" => "N",
                        "SHOW_FROM_SECTION" => "N",
                        "SHOW_MAX_QUANTITY" => "N",
                        "SHOW_OLD_PRICE" => "N",
                        "SHOW_PRICE_COUNT" => "1",
                        "SHOW_SLIDER" => "Y",
                        "SLIDER_INTERVAL" => "3000",
                        "SLIDER_PROGRESS" => "N",
                        "TEMPLATE_THEME" => "blue",
                        "USE_ENHANCED_ECOMMERCE" => "N",
                        "USE_MAIN_ELEMENT_SECTION" => "N",
                        "USE_PRICE_COUNT" => "N",
                        "USE_PRODUCT_QUANTITY" => "Y"
                    )
                );
                ?>
	            <br>
            </div>
        <? endif; ?>
		<? if ($massID) : ?>
            <div class="tabs__content <?= $series ? '' : 'active' ?>">
                <?
                global $addFilter;
                //print_r($GLOBALS['massID']);
                $addFilter = Array("IBLOCK_ID"=>$arParams["IBLOCK_ID"], "ID" => $massID, "ACTIVE_DATE"=>"Y", "ACTIVE"=>"Y");
                $APPLICATION->IncludeComponent(
                    "bitrix:catalog.section",
                    "recommend",
                    Array(
                        "ACTION_VARIABLE" => "action",
                        "ADD_PICT_PROP" => "-",
                        "ADD_PROPERTIES_TO_BASKET" => "Y",
                        "ADD_SECTIONS_CHAIN" => "N",
                        "ADD_TO_BASKET_ACTION" => "ADD",
                        "AJAX_MODE" => "N",
                        "AJAX_OPTION_ADDITIONAL" => "",
                        "AJAX_OPTION_HISTORY" => "N",
                        "AJAX_OPTION_JUMP" => "N",
                        "AJAX_OPTION_STYLE" => "Y",
                        "BACKGROUND_IMAGE" => "-",
                        "BASKET_URL" => "/personal/basket.php",
                        "BROWSER_TITLE" => "-",
                        "CACHE_FILTER" => "N",
                        "CACHE_GROUPS" => "Y",
                        "CACHE_TIME" => "36000000",
                        "CACHE_TYPE" => "N",
                        "COMPATIBLE_MODE" => "Y",
                        "CONVERT_CURRENCY" => "N",
                        "CUSTOM_FILTER" => "",
                        "DETAIL_URL" => "",
                        "DISABLE_INIT_JS_IN_COMPONENT" => "N",
                        "DISPLAY_BOTTOM_PAGER" => "Y",
                        "DISPLAY_COMPARE" => "N",
                        "DISPLAY_TOP_PAGER" => "N",
                        "ELEMENT_SORT_FIELD" => "sort",
                        "ELEMENT_SORT_FIELD2" => "id",
                        "ELEMENT_SORT_ORDER" => "asc",
                        "ELEMENT_SORT_ORDER2" => "desc",
                        "ENLARGE_PRODUCT" => "STRICT",
                        "FILTER_NAME" => "addFilter",
                        "HIDE_NOT_AVAILABLE" => "N",
                        "HIDE_NOT_AVAILABLE_OFFERS" => "N",
                        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                        "IBLOCK_TYPE" => "1c_catalog",
                        "INCLUDE_SUBSECTIONS" => "Y",
                        "LABEL_PROP" => array(),
                        "LAZY_LOAD" => "N",
                        "LINE_ELEMENT_COUNT" => "3",
                        "LOAD_ON_SCROLL" => "N",
                        "MESSAGE_404" => "",
                        "MESS_BTN_ADD_TO_BASKET" => "В корзину",
                        "MESS_BTN_BUY" => "Купить",
                        "MESS_BTN_DETAIL" => "Подробнее",
                        "MESS_BTN_SUBSCRIBE" => "Подписаться",
                        "MESS_NOT_AVAILABLE" => "Нет в наличии",
                        "META_DESCRIPTION" => "-",
                        "META_KEYWORDS" => "-",
                        "OFFERS_CART_PROPERTIES" => array(),
                        "OFFERS_FIELD_CODE" => array("", ""),
                        "OFFERS_LIMIT" => "9",
                        "OFFERS_PROPERTY_CODE" => array("", ""),
                        "OFFERS_SORT_FIELD" => "sort",
                        "OFFERS_SORT_FIELD2" => "id",
                        "OFFERS_SORT_ORDER" => "asc",
                        "OFFERS_SORT_ORDER2" => "desc",
                        "PAGER_BASE_LINK_ENABLE" => "N",
                        "PAGER_DESC_NUMBERING" => "N",
                        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                        "PAGER_SHOW_ALL" => "N",
                        "PAGER_SHOW_ALWAYS" => "N",
                        "PAGER_TEMPLATE" => ".default",
                        "PAGER_TITLE" => "Товары",
                        "PAGE_ELEMENT_COUNT" => "9",
                        "PARTIAL_PRODUCT_PROPERTIES" => "N",
                        "PRICE_CODE" => array(),
                        "PRICE_VAT_INCLUDE" => "Y",
                        "PRODUCT_BLOCKS_ORDER" => "price,props,sku,quantityLimit,quantity,buttons",
                        "PRODUCT_DISPLAY_MODE" => "N",
                        "PRODUCT_ID_VARIABLE" => "id",
                        "PRODUCT_PROPERTIES" => array(),
                        "PRODUCT_PROPS_VARIABLE" => "prop",
                        "PRODUCT_QUANTITY_VARIABLE" => "quantity",
                        "PRODUCT_ROW_VARIANTS" => "[{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false}]",
                        "PRODUCT_SUBSCRIPTION" => "Y",
                        "PROPERTY_CODE" => array("", ""),
                        "PROPERTY_CODE_MOBILE" => array(),
                        "RCM_PROD_ID" => $arParams["PRODUCT_ID"],
                        "RCM_TYPE" => "any",
                        "SECTION_CODE" => "",
                        //"SECTION_ID" => '33',
                        "SECTION_ID_VARIABLE" => "SECTION_ID",
                        "SECTION_URL" => "",
                        "SECTION_USER_FIELDS" => array("", ""),
                        "SEF_MODE" => "N",
                        "SET_BROWSER_TITLE" => "N",
                        "SET_LAST_MODIFIED" => "N",
                        "SET_META_DESCRIPTION" => "N",
                        "SET_META_KEYWORDS" => "N",
                        "SET_STATUS_404" => "N",
                        "SET_TITLE" => "N",
                        "SHOW_404" => "N",
                        "SHOW_ALL_WO_SECTION" => "N",
                        "SHOW_CLOSE_POPUP" => "N",
                        "SHOW_DISCOUNT_PERCENT" => "N",
                        "SHOW_FROM_SECTION" => "N",
                        "SHOW_MAX_QUANTITY" => "N",
                        "SHOW_OLD_PRICE" => "N",
                        "SHOW_PRICE_COUNT" => "1",
                        "SHOW_SLIDER" => "Y",
                        "SLIDER_INTERVAL" => "3000",
                        "SLIDER_PROGRESS" => "N",
                        "TEMPLATE_THEME" => "blue",
                        "USE_ENHANCED_ECOMMERCE" => "N",
                        "USE_MAIN_ELEMENT_SECTION" => "N",
                        "USE_PRICE_COUNT" => "N",
                        "USE_PRODUCT_QUANTITY" => "Y"
                    )
                );
                ?>
	            <br>
            </div>
        <? endif; ?>
	</div>
    <!--/noindex-->
<?}
unset($actualItem, $itemIds, $jsParams);