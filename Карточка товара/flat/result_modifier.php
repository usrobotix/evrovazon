<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CBitrixComponentTemplate $this
 * @var CatalogElementComponent $component
 */
if ($arResult['PROPERTIES']['SERIA']['VALUE']) {
	require_once 'functions.php';

	$row = getSeriaHighloadBlockByXmlId($arResult['PROPERTIES']['SERIA']['VALUE']);

	$seriaAlias = $arResult['PROPERTIES']['SERIA']['VALUE']; // old

	if(!empty($row['UF_NAME'])) {
		$seriaAlias = ToLower(CUtil::translit($row['UF_NAME'], 'ru', array('replace_space' => '_', 'replace_other' => '_')));
	}

	// в фильтре, почему-то, значения серий берутся из HTML_VALUE_ALT, а он из имени highload блока, по этому в крошках из этой функции будем вставлять
	$arResult['SECTION']['PATH'][] = array(
		"NAME" => $row['UF_NAME'],
		"~SECTION_PAGE_URL" => rtrim($arResult['SECTION']['SECTION_PAGE_URL'], '/') . '/filter/seria-' . $seriaAlias . '/',
	);
}

$component = $this->getComponent();
$arParams = $component->applyTemplateModifications();
$end_key = 0;
if($arResult['DETAIL_PICTURE']['SRC'] != ''){
	$arResult['MORE_PHOTOS'][$end_key]['MIN'] = CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], array('width'=>420, 'height'=>420), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['MAX'] = CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], array('width'=>1200, 'height'=>1200), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['SMALL'] = CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], array('width'=>100, 'height'=>100), BX_RESIZE_IMAGE_EXACT, true);
	$end_key++;
}
foreach ($arResult['MORE_PHOTO']['VALUE'] as $photo)
{
	$arResult['MORE_PHOTOS'][$end_key]['MIN'] = CFile::ResizeImageGet($photo, array('width'=>420, 'height'=>420), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['MAX'] = CFile::ResizeImageGet($photo, array('width'=>1200, 'height'=>1200), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['SMALL'] = CFile::ResizeImageGet($photo, array('width'=>100, 'height'=>100), BX_RESIZE_IMAGE_EXACT, true);
	$end_key++;
}
foreach ($arResult['PROPERTIES']['more_photo']['VALUE'] as $photo1)
{
	$arResult['MORE_PHOTOS'][$end_key]['MIN'] = CFile::ResizeImageGet($photo1, array('width'=>420, 'height'=>420), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['MAX'] = CFile::ResizeImageGet($photo1, array('width'=>1200, 'height'=>1200), BX_RESIZE_IMAGE_PROPORTIONAL, true);
	$arResult['MORE_PHOTOS'][$end_key]['SMALL'] = CFile::ResizeImageGet($photo1, array('width'=>100, 'height'=>100), BX_RESIZE_IMAGE_EXACT, true);
	$end_key++;
}

foreach($arResult['OFFERS'] as $offer_key=>$arOffer){
    if(intval($arParams["SELECTED_OFFER_ID"]) == intval($arOffer['ID'])){
        $arResult["SELECTED_OFFER"] = $offer_key;
        break;
    }
}
global $massID;
//$massID = $arResult['PROPERTIES']['RECOMEND']['VALUE'];
/* 

foreach ($arResult['OFFERS'] as $off => $OFFERS)
{
	foreach ($OFFERS['ITEM_PRICES'] as $pr => $prices)
	{
		if($prices['RATIO_PRICE'] == 0)
		{
			$arResult['OFFERS'][$off]['ITEM_PRICES'][$pr]['RATIO_PRICE'] = 'По запросу';
			$arResult['OFFERS'][$off]['ITEM_PRICES'][$pr]['PRINT_RATIO_PRICE'] = 'По запросу';
			$arResult['OFFERS'][$off]['ITEM_PRICES'][$pr]['RATIO_BASE_PRICE'] = 'По запросу';
			$arResult['OFFERS'][$off]['ITEM_PRICES'][$pr]['PRINT_BASE_PRICE'] = 'По запросу';
			$arResult['OFFERS'][$off]['ITEM_PRICES'][$pr]['BASE_PRICE'] = 'По запросу';
		}
	}
} */

?>
