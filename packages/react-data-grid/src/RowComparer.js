import ColumnMetrics from './ColumnMetrics';

function doesRowContainSelectedCell(props) {
  let selected = props.cellMetaData.selected;
  if (selected && selected.rowIdx === props.idx) {
    return true;
  }
  return false;
}

function isWithinSelectedRange(props) {
  const selectedRange = props.cellMetaData.selectedRange;
  return selectedRange && selectedRange.topLeft.rowIdx <= props.idx && props.idx <= selectedRange.bottomRight.rowIdx;
}

function doesInProgressSelectedRangeContainRow(props) {
  const inSelectedRange = isWithinSelectedRange(props);
  const inProgress = props.cellMetaData.selecting && props.cellMetaData.selecting.inProgress;
  return inProgress && inSelectedRange;
}

function isWithinSelectedRangeChanging(nextProps, currentProps) {
  return isWithinSelectedRange(nextProps) !== isWithinSelectedRange(currentProps);
}

function willRowBeDraggedOver(props) {
  let dragged = props.cellMetaData.dragged;
  return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
}

function hasRowBeenCopied(props) {
  let copied = props.cellMetaData.copied;
  return copied != null && copied.rowIdx === props.idx;
}

export const shouldRowUpdate = (nextProps, currentProps) => {
  return !(ColumnMetrics.sameColumns(currentProps.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
    doesRowContainSelectedCell(currentProps) ||
    doesRowContainSelectedCell(nextProps) ||
    doesInProgressSelectedRangeContainRow(currentProps) ||
    doesInProgressSelectedRangeContainRow(nextProps) ||
    isWithinSelectedRangeChanging(nextProps, currentProps) ||
    willRowBeDraggedOver(nextProps) ||
    nextProps.row !== currentProps.row ||
    currentProps.colDisplayStart !== nextProps.colDisplayStart ||
    currentProps.colDisplayEnd !== nextProps.colDisplayEnd ||
    currentProps.colVisibleStart !== nextProps.colVisibleStart ||
    currentProps.colVisibleEnd !== nextProps.colVisibleEnd ||
    hasRowBeenCopied(currentProps) ||
    currentProps.isSelected !== nextProps.isSelected ||
    nextProps.height !== currentProps.height ||
    currentProps.isOver !== nextProps.isOver ||
    currentProps.expandedRows !== nextProps.expandedRows ||
    currentProps.canDrop !== nextProps.canDrop ||
    currentProps.forceUpdate === true ||
    currentProps.extraClasses !== nextProps.extraClasses;
};

export default shouldRowUpdate;
