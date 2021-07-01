import exp from 'assets/data/exp.json'
import styled from 'styled-components';
import { numberFormat } from 'utilities';

export function ExpTable(): JSX.Element {
  const sum = (v: number[]): string => {
    const total = v.reduce((acc: number, cur: number) => {
      return acc + cur
    }, 0)
    return numberFormat(total)
  }
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th align="center" rowSpan={2}>Lv.</th>
            <th align="center" rowSpan={2}>Base</th>
            <th align="center" colSpan={5}>Job</th>
          </tr>
          <tr>
            <th align="center">Novice</th>
            <th align="center">First</th>
            <th align="center">Second</th>
            <th align="center">Advance</th>
            <th align="center">Third</th>
          </tr>
        </thead>
        <tbody>
          {exp.base.map((r: number, i: number) => (
            <tr key={r}>
              <th align="center">{i + 2}</th>
              <td align="right">{numberFormat(exp.base[i])}</td>
              <td align="right">{numberFormat(exp.noviceJob[i])}</td>
              <td align="right">{numberFormat(exp.firstJob[i])}</td>
              <td align="right">{numberFormat(exp.secondJob[i])}</td>
              <td align="right">{numberFormat(exp.advanceJob[i])}</td>
              <td align="right">{numberFormat(exp.thirdJob[i])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th align="center">Total</th>
            <th align="right">{sum(exp.base)}</th>
            <th align="right">{sum(exp.noviceJob)}</th>
            <th align="right">{sum(exp.firstJob)}</th>
            <th align="right">{sum(exp.secondJob)}</th>
            <th align="right">{sum(exp.advanceJob)}</th>
            <th align="right">{sum(exp.thirdJob)}</th>
          </tr>

        </tfoot>
      </table>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  overflow: scroll;
  & table {
    width: 100%;
    & tr {
      & th, & td {
        padding: 1rem;
        border: 1px solid rgba(0,0,0,0.1);
        border-top: none;
        border-bottom: none;
      }
    }
    & tbody {
      & tr {
        &:nth-child(odd){
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;