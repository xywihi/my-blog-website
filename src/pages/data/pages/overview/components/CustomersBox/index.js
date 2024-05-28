import React, { useEffect } from "react";
import styles from "./index.module.less";
import Image from "@/components/Image";
import avatar from "@/assets/images/avatar.png";
export default function CustomersBox({ data }) {
  useEffect(() => {
  }, [data]);
  return (
    <div className={`${styles.customersBox} bg1 borderR12 pa24`}>
      <div className="bg3 pa12 borderR12 flex column">
        <div>
          <div className="flexS maB12">
            <Image src={avatar} width="48px" height="48px" />
            <div className="maL12">
              <p className="fontB">南絮</p>
              <p className="fontSmall gray">3年会员</p>
            </div>
          </div>
          <div className="flexB font14 maB6">
            <div>
              <div></div>
              <span>本月订单量：</span>
            </div>
            <span>100</span>
          </div>
          <div className="flexB font14 maB6">
            <div>
              <div></div>
              <span>总共订单量：</span>
            </div>
            <span>100</span>
          </div>
          <div className="bg_yellow colorBlack paH12 paV3 borderR50 flexB maT24">
            <span className="fontB">￥254.00</span>
            <span className="fontSmall">5.20</span>
          </div>
        </div>
        <hr className="maV12 opacity20" />
        <p>
          ￥<span>23,542</span>
          <span className="fontSmall gray">.24</span>
        </p>
      </div>
      <div>
        <div className="bg3 pa12 borderR12 maB12">
          <input placeholder="通过用户名搜索" />
        </div>
        <div className="flexB">
          <div className="flexB font14">
            <span>单量</span>
            <div></div>
          </div>
          <div>
            <span>单量</span>
            <div></div>
          </div>
          <div>
            <span>单量</span>
            <div></div>
          </div>
        </div>
        <div className={` ${styles.customersListBox} paV12`}>
        <ul className="scrollbarBox heightFull">
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span className="font14">南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span className="font14">南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span className="font14">南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span className="font14">南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span>南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
          <li className="pa6 borderR12 bg3 flexB maB6">
            <div className="flexB">
              <div className="maR6">
                <Image src={avatar} width="32px" height="32px" />
              </div>
              <span>南絮</span>
            </div>
            <p>
              <span className="maR6">￥</span>
              <span>23,542</span>
              <span className="fontSmall gray">.24</span>
            </p>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}
