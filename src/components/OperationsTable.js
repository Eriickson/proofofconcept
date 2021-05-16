import React from 'react';
import { DetailsList } from '@fluentui/react';
import Moment from 'moment';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import 'office-ui-fabric-react/dist/css/fabric.css';

const classNames = mergeStyleSets({
  table: {
    margin: 'auto',
  }
});

const columns = [
  { key: 'column1', name: '', fieldName: 'name', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column2', name: '', fieldName: 'attachment', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column3', name: 'Títulos', fieldName: 'titles', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column4', name: 'Comprado', fieldName: 'bought', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column5', name: 'Valoración', fieldName: 'valuation', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column6', name: 'Revalorización', fieldName: 'revaluation', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column7', name: '', fieldName: 'revaluationPercentage', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column8', name: 'Peso', fieldName: 'weight', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column9', name: 'V. liq', fieldName: 'vLiquid', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column10', name: 'Fecha VL', fieldName: 'liquidDate', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column11', name: 'Puntos IronIA', fieldName: 'ironiaPoints', minWidth: 100, maxWidth: 300, isResizable: true },
  { key: 'column12', name: '', fieldName: 'actions', minWidth: 100, maxWidth: 300, isResizable: true },
];

const formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
})

const dateFormat = (stringDate) => {
  return Moment(stringDate).format('DD-MM-YYYY');
}

const OperationsTable = (props) => {
  const valuation = props.reporting.positions.positionsTo.aggregation.reduce((total, aggregation) => {
	  return total += aggregation.total.value;
  }, 0);

  const plusMinus =  props.reporting.positions.positionsTo.aggregation.reduce((total, aggregation) => {
	  return total += aggregation.total.plusMinus;
  }, 0);

  const plusMinusPercentage =  props.reporting.positions.positionsTo.aggregation.reduce((total, aggregation) => {
	  return total += aggregation.total.plusMinusPercentage;
  }, 0);

  const buyAmount = valuation - plusMinus;

  const growth = buyAmount == 0
    ? 0
    : (valuation - buyAmount) / buyAmount;

  const weight  = props.reporting.positions.positionsTo.aggregation.reduce((total, aggregation) => {
	  return total += aggregation.total.weight;
  }, 0);

  var categories = [];
  props.reporting.positions.positionsTo.aggregation.forEach(aggregation => {
    var subcategories = [];
    aggregation.level2.forEach(level2 => {
      var positions = [];
      level2.positions.forEach(position => {
        if (!position.hasOwnProperty('exchangeRate')) {
          position['exchangeRate'] = { value: 1 };
        } else {
          if (!position.exchangeRate.hasOwnProperty('value')) {
            position.exchangeRate['value'] = 1;
          }
        }

        positions.push({
          name: position.productName,
          shortName: position.productShortName,
          instrumentId: position.instrumentId,
          isin: position.isin,
          weight: position.weight,
          titles: position.titles,
          price: position.price,
          plusMinus: position.plusMinus,
          plusMinusPercentage: position.plusMinusPercentage,
          value: position.value,
          instrumentType: position.instrumentType,
          valuation: position.value,
          buyAmount: position.value == 0 || position.value == null ? 0 : position.value - position.plusMinus,
          valuationCoin: position.lastPrice / position.exchangeRate.value,
          exchangeRate: position.exchangeRate.value,
          lastPrice: position.lastPrice,
          lastPriceDate: position.dateLastPriceAsString
        });
      });

      const level2PlusMinus = level2.total.plusMinus;
      const level2PlusMinusPercentage = level2.total.plusMinusPercentage;

      const level2BuyAmount = level2.total.value == 0 || level2.total.value == null ? 0 : level2.total.value - level2.total.plusMinus;
      const level2Valuation = level2.total.value;
      const level2Growth = level2BuyAmount == 0 ? 0 : (level2Valuation - level2BuyAmount) / level2BuyAmount;
      const level2Weight = level2.total.weight;

      subcategories.push({
        name: level2.data.name,
        positions: positions,
        buyAmount: level2BuyAmount,
        valuation: level2Valuation,
        plusMinus: level2PlusMinus,
        plusMinusPercentage: level2PlusMinusPercentage,
        growth: level2Growth,
        weight: level2Weight
      });
    });

    const aggregationBuyAmount = aggregation.total.value == 0 ||aggregation.total.value == null ? 0 : aggregation.total.value - aggregation.total.plusMinus;
    const aggregationValuation = aggregation.total.value;
    const aggregationWeight = aggregation.total.weight;
    const aggregationPlusMinus = aggregation.total.plusMinus;
    const aggregationPlusMinusPercentage = aggregation.total.plusMinusPercentage;
    const aggregationGrowth = aggregationBuyAmount == 0 ? 0 : (aggregationValuation - aggregationBuyAmount) / aggregationBuyAmount;

    var positions = [];
    if (aggregation.level2.length == 0) {
      aggregation.positions.forEach(position => {
        positions.push({
          name: position.productName,
          shortName: position.productShortName,
          instrumentId: position.instrumentId,
          isin: position.isin,
          weight: position.weight,
          titles: position.titles,
          price: position.price,
          plusMinus: position.plusMinus,
          plusMinusPercentage: position.plusMinusPercentage,
          value: position.value,
          instrumentType: position.instrumentType,
          valuation: position.value == 0 || position.value == null ? 0 : position.value - position.plusMinus,
          valuationCoin: position.lastPrice,
          exhangeRate: "",
          lastPrice: position.lastPrice,
          lastPriceDate: position.dateLastPriceAsString
        });
      });
    }

    categories.push({
      name: aggregation.data.name,
      subcategories: subcategories,
      buyAmount:aggregationBuyAmount,
      valuation: aggregationValuation,
      weight: aggregationWeight,
      plusMinus: aggregationPlusMinus,
      plusMinusPercentage: aggregationPlusMinusPercentage,
      growth: aggregationGrowth,
      positions: positions
    });
  });

  console.log(categories);
  var registers = [
  {
    name: 'Total Cartera',
    attachment: '-',
    titles: '-',
    bought: !isNaN(buyAmount) ? formatter.format(buyAmount) : '-',
    valuation: !isNaN(valuation) ? formatter.format(valuation) : '-',
    revaluation: !isNaN(plusMinus) ? plusMinus.toFixed(2) : '-' ,
    revaluationPercentage: !isNaN(growth) ? (growth * 100).toFixed(2) + '%' : '-',
    weight: weight ? (weight * 100).toFixed(2) + '%' : '-',
    vLiquid: '-',
    liquidDate: '-',
    ironiaPoints: '-',
    actions: '-'
  }];

  categories.forEach(category => {
    registers.push({
      name: category.name ? category.name : '-',
      attachment: '-',
      titles: '-',
      bought: !isNaN(category.buyAmount) ? formatter.format(category.buyAmount) : '-',
      valuation: !isNaN(category.valuation) ? formatter.format(category.valuation) : '-',
      revaluation: !isNaN(category.plusMinus) ? category.plusMinus.toFixed(2) : '-',
      revaluationPercentage: !isNaN(category.plusMinusPercentage) ? (category.plusMinusPercentage * 100).toFixed(2) + '%' : '-',
      weight: category.weight ? (category.weight * 100).toFixed(2) + '%' : '-',
      vLiquid: '-',
      liquidDate: '-',
      ironiaPoints: '-',
      actions: '-'
    });

    category.positions.forEach(position => {
      registers.push({
        name: position.name,
        attachment: '-',
        titles: position.titles ? position.titles.toFixed(2) : '-',
        bought: !isNaN(position.buyAmount) ? formatter.format(position.buyAmount) : '-',
        valuation: !isNaN(position.valuation) ? formatter.format(position.valuation) : '-',
        revaluation: !isNaN(position.plusMinus) ? formatter.format(position.plusMinus) : '-',
        revaluationPercentage: !isNaN(position.plusMinusPercentage) ? (position.plusMinusPercentage * 100).toFixed(2) + '%' : '-',
        weight: position.weight ? (position.weight * 100).toFixed(2) + '%' : '-',
        vLiquid: position.lastPrice ? formatter.format(position.lastPrice) : '-',
        liquidDate: position.lastPriceDate ? dateFormat(position.lastPriceDate) : '-',
        ironiaPoints: '-',
        actions: '-'
      });
    });

    category.subcategories.forEach(subcategory => {
      registers.push({
        name: subcategory.name,
        attachment: '-',
        titles: '-',
        bought: !isNaN(subcategory.buyAmount) ? formatter.format(subcategory.buyAmount) : '-',
        valuation: !isNaN(subcategory.valuation) ? formatter.format(subcategory.valuation) : '-',
        revaluation: !isNaN(subcategory.plusMinus) ? formatter.format(subcategory.plusMinus) : '-',
        revaluationPercentage: !isNaN(subcategory.plusMinusPercentage) ? (subcategory.plusMinusPercentage * 100).toFixed(2) + '%' : '-',
        weight: subcategory.weight ? (subcategory.weight * 100).toFixed(2) + '%' : '-',
        vLiquid: '-',
        liquidDate: '-',
        ironiaPoints: '-',
        actions: '-'
      });

      subcategory.positions.forEach(position => {
        registers.push({
          name: position.name,
          attachment: '-',
          titles: position.titles ? position.titles.toFixed(2) : '-',
          bought: !isNaN(position.buyAmount) ? formatter.format(position.buyAmount) : '-',
          valuation: !isNaN(position.valuation) ? formatter.format(position.valuation) : '-',
          revaluation: !isNaN(position.plusMinus) ? formatter.format(position.plusMinus) : '-',
          revaluationPercentage: !isNaN(position.plusMinusPercentage) ? (position.plusMinusPercentage * 100).toFixed(2) + '%' : '-',
          weight: position.weight ? (position.weight * 100).toFixed(2) + '%' : '-',
          vLiquid: position.lastPrice ? formatter.format(position.lastPrice) : '-',
          liquidDate: dateFormat(position.lastPriceDate),
          ironiaPoints: '-',
          actions: '-'
        });
      });
    });
  });

  return (
    <div data-is-scrollable={true}>
      <div className={`s-Grid-col ms-sm12 ${classNames.table}`}>
        <DetailsList
          items={registers}
          columns={columns}
          selectionMode={0}
        />
      </div>
    </div>
  );
};

export default OperationsTable;
