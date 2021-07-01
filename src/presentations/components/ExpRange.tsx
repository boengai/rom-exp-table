import { Col, Divider, Form, Row, Select, Typography } from 'antd';
import exp from 'assets/data/exp.json'
import { numberFormat } from 'utilities';

interface ILevel {
  exp: number
  sequence: number
  title: string
}
interface ILevelGroup {
  payloads: ILevel[]
  title: string
}

export function ExpRange(): JSX.Element {
  const expBases: ILevelGroup[] = [
    {
      title: 'Base Level',
      payloads: exp.base.map((r: number, i: number): ILevel => ({ exp: r, sequence: i, title: `Base Lv .${i + 2}`, }))
    }
  ]
  const expNoviceJob = exp.noviceJob.map((r: number, i: number): ILevel => ({ exp: r, sequence: i, title: `Novice Job Lv. ${i + 2}` }))
  const expFirstJobs = exp.firstJob.map((r: number, i: number): ILevel => ({ exp: r, sequence: expNoviceJob[expNoviceJob.length - 1].sequence + i + 1, title: `First Job Lv. ${i + 2}` }))
  const expSecondJobs = exp.secondJob.map((r: number, i: number): ILevel => ({ exp: r, sequence: expFirstJobs[expFirstJobs.length - 1].sequence + i + 1, title: `Second Job Lv. ${i + 2}` }))
  const expAdvanceJobs = exp.advanceJob.map((r: number, i: number): ILevel => ({ exp: r, sequence: expSecondJobs[expSecondJobs.length - 1].sequence + i + 1, title: `Advance Job Lv. ${i + 2}` }))
  const expThirdJobs = exp.thirdJob.map((r: number, i: number): ILevel => ({ exp: r, sequence: expAdvanceJobs[expAdvanceJobs.length - 1].sequence + i + 1, title: `Third Job Lv. ${i + 2}` }))
  const expJobs: ILevelGroup[] = [
    {
      title: 'Novice Job Level',
      payloads: expNoviceJob
    },
    {
      title: 'First Job Level',
      payloads: expFirstJobs
    },
    {
      title: 'Second Job Level',
      payloads: expSecondJobs
    },
    {
      title: 'Advance Job Level',
      payloads: expAdvanceJobs
    },
    {
      title: 'Third Job Level',
      payloads: expThirdJobs
    }
  ]

  return (
    <>
      <Typography.Title level={5}>
        Base
      </Typography.Title>
      <FormRange data={expBases} />
      <Divider />
      <Typography.Title level={5}>
        Job
      </Typography.Title>
      <FormRange data={expJobs} />
    </>
  )
}

function FormRange({ data }: { data: ILevelGroup[] }): JSX.Element {
  const formItemNoMarginBot = { marginBottom: 0 }
  const sum = (rs: ILevelGroup[], from: number, to: number): string => {
    const total = rs.reduce((accG: number, curG: ILevelGroup) => {
      return accG + curG.payloads.filter((r: ILevel) => r.sequence >= from && r.sequence <= to)
        .reduce((accP: number, curP: ILevel) => {
          return accP + curP.exp
        }, 0)
    }, 0)

    return numberFormat(total)
  }

  return (
    <Form
      name="base-range"
      initialValues={
        {
          from: data[0].payloads[0].sequence,
          to: data[data.length - 1].payloads[data[data.length - 1].payloads.length - 1].sequence
        }
      }
    >
      <Row gutter={16} justify="space-around" align="middle">
        <Col xs={24} lg={7}>
          <Form.Item shouldUpdate style={formItemNoMarginBot}>
            {({ getFieldValue }) => (
              <Form.Item name="from" noStyle>
                <Select placeholder="Select from level">
                  {data.map((g: ILevelGroup) => (
                    <Select.OptGroup key={g.title} label={g.title}>
                      {g.payloads.map((p: ILevel) => (
                        <Select.Option key={p.sequence} value={p.sequence} disabled={p.sequence > getFieldValue('to')}>
                          {p.title}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} lg={2} style={{ textAlign: "center" }}>
          <Typography.Text strong>To</Typography.Text>
        </Col>
        <Col xs={24} lg={7}>
          <Form.Item shouldUpdate style={formItemNoMarginBot}>
            {({ getFieldValue }) => (
              <Form.Item name="to" noStyle>
                <Select placeholder="Select to level">
                  {data.map((g: ILevelGroup) => (
                    <Select.OptGroup key={g.title} label={g.title}>
                      {g.payloads.map((p: ILevel) => (
                        <Select.Option key={p.sequence} value={p.sequence} disabled={p.sequence < getFieldValue('from')}>
                          {p.title}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} lg={2} style={{ textAlign: "right" }}>
          <Typography.Text strong>Total:</Typography.Text>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item shouldUpdate style={{ ...formItemNoMarginBot, textAlign: "right" }}>
            {({ getFieldValue }) => (
              <Typography.Text strong>{sum(data, getFieldValue("from"), getFieldValue("to"))}</Typography.Text>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}