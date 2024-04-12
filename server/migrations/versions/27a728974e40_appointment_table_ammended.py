"""appointment table ammended

Revision ID: 27a728974e40
Revises: 4c0e22fffe01
Create Date: 2024-04-12 14:22:53.139948

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '27a728974e40'
down_revision = '4c0e22fffe01'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=mysql.INTEGER(),
               nullable=False)
        batch_op.alter_column('appointment_type_id',
               existing_type=mysql.INTEGER(),
               nullable=False)
        batch_op.alter_column('appointment_time',
               existing_type=mysql.DATETIME(),
               nullable=False)
        batch_op.alter_column('created_at',
               existing_type=mysql.DATETIME(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=mysql.DATETIME(),
               nullable=True)
        batch_op.alter_column('appointment_time',
               existing_type=mysql.DATETIME(),
               nullable=True)
        batch_op.alter_column('appointment_type_id',
               existing_type=mysql.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=mysql.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
